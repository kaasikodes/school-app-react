import {
  Button,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Menu,
  Popconfirm,
  Space,
  Spin,
  Table,
  TablePaginationConfig,
  Typography,
} from "antd";
import React, { useContext, useState } from "react";
import { EllipsisOutlined, EditOutlined } from "@ant-design/icons";
import { getCRTemplate } from "../../helpers/schoolCRecordTemplates";

import { openNotification } from "../../helpers/notifications";
import { useQuery, useQueryClient } from "react-query";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import {
  getSessionCourseParticipants,
  saveCourseParticipantAssessment,
} from "../../helpers/courses";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useFetchSchoolSessionSetting } from "../../helpersAPIHooks/sessions";

const backUpDropdown = () => (
  <Dropdown
    overlay={
      <Menu
        items={[
          {
            key: "1",
            label: (
              <button className="w-full text-left">Remove Participant</button>
            ),
          },
          {
            key: "2",
            label: (
              <button className="w-full text-left">Participant Details</button>
            ),
          },
          {
            key: "3",
            label: <button className="w-full text-left">Modify</button>,
            // let them be a primary version that you can use
            // the teacher should be able to edit from here (prob only the p-course teacher)
            // keep track of who is modifying the original
            // always warn befor modifications begin, should they first save a copy b4 progressing
          },
        ]}
      />
    }
    trigger={["click"]}
  >
    <Space>
      <Button icon={<EllipsisOutlined />} type="text" />
    </Space>
  </Dropdown>
);
export interface IParticipantEntry {
  key: string;
  id: string;
  studentName: string;

  grade: string;
  total: number;
}

export const originData: IParticipantEntry[] = Array(50)
  .fill(0)
  .map((_, i) => ({
    key: (i * 2).toString(),
    id: (i * 2).toString(),
    studentName: "Paul Gbenga",

    grade: "c",
    total: 0,
  }));

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: IParticipantEntry;
  index: number;
  children: React.ReactNode;
}
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

interface IProps {
  courseId: string;
  levelId: string;
  searchParticipantTerm?: string;
  disableActions?: boolean;
}

const CourseParticipantTable = ({
  courseId,
  levelId,
  searchParticipantTerm = "",
  disableActions = false,
}: IProps) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const sessionId = globalState?.currentSchool?.currentSessionId as string;

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 4,
    showSizeChanger: false,
  });

  const [breakDownKeys, setbreakDownKeys] = useState<string[]>([]);

  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: IParticipantEntry) => record.key === editingKey;
  const handleEdit = (
    record: Partial<IParticipantEntry> & { key: React.Key }
  ) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const handleSave = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IParticipantEntry;
      openNotification({
        state: "info",
        title: "Wait a minute",
        description: <Spin />,
      });
      const participant = participants.data.find(
        (item: any) => item.id === editingKey
      );
      let total = 0;
      Object.entries(row).forEach((item) => (total += item[1]));
      // check policy and identify the grade  here no do that backend and return

      if (schoolId) {
        saveCourseParticipantAssessment({
          participantId: participant.id,
          breakDown: row,
          total,

          schoolId: schoolId,
          token,
        })
          .then((res: any) => {
            openNotification({
              state: "success",
              title: "Success",
              description: `Record saved!`,
            });
            setEditingKey("");
            queryClient.invalidateQueries({
              queryKey: ["course-participants"],
            });
          })
          .catch((err: any) => {
            openNotification({
              state: "error",
              title: "Error occures",
              description: `Error occured!`,
            });
          });
      }

      // upadate backend b4 you can do anything here

      const newData = [...participants];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        let total = 0;
        Object.entries(row).forEach((item) => {
          if (breakDownKeys.indexOf(item[0]) !== -1) {
            total += item[1];
          }
        });
        newData.splice(index, 1, {
          ...item,
          ...row,
          total,
        });
        setEditingKey("");
      } else {
        newData.push(row);
        setEditingKey("");
      }
    } catch (errInfo) {}
  };
  const handleCancel = () => {
    setEditingKey("");
  };
  const actColumns = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return (
          <div className="flex gap-3">
            {editable ? (
              <span>
                <Typography.Link
                  onClick={() => handleSave(record.key)}
                  style={{ marginRight: 8 }}
                >
                  Save
                </Typography.Link>
                <Popconfirm
                  title="Sure to cancel?"
                  onConfirm={handleCancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <span>Cancel</span>
                </Popconfirm>
              </span>
            ) : (
              <>
                {" "}
                <Button
                  icon={<EditOutlined />}
                  type="text"
                  disabled={editingKey !== ""}
                  onClick={() => handleEdit(record)}
                />
                {backUpDropdown()}
              </>
            )}
          </div>
        );
      },
    },
  ];
  const { data: schoolSessionSetting } = useFetchSchoolSessionSetting({
    sessionId,
    schoolId,
    token,
  });
  const {
    data: templateData,

    isSuccess,
  } = useQuery<any, any, any, any>(
    ["course-record-templates", schoolSessionSetting?.courseRecordTemplateId],

    () => {
      return getCRTemplate({
        token,
        id: schoolSessionSetting?.courseRecordTemplateId as string,
      });
    },

    {
      enabled: schoolSessionSetting?.courseRecordTemplateId ? true : false,
      onError: (err) => {
        openNotification({
          state: "error",
          title: "Error occures",
          description: `Oops, an err occured: ${err?.message}`,
        });
      },
      onSuccess: (data) => {
        const brkKeys: string[] = [];
        const { mergedColumns: columns } = data;
        columns.forEach(
          (item: any) => item.editable && brkKeys.push(item.dataIndex)
        );
        setbreakDownKeys(brkKeys);
      },
      select: (res: any) => {
        const result = res.data.data;

        const columns = JSON.parse(result.break_down);
        const templateColumns = columns;

        const fcolumns = columns
          .map((item: any) => ({
            title: `${item.name}(${item.value})`,
            dataIndex: item.name,
            key: item.name,
            editable: true,
          }))
          .map((col: any) => {
            if (!col.editable) {
              return col;
            }
            return {
              ...col,
              onCell: (record: IParticipantEntry) => ({
                record,
                inputType: col.dataIndex === "remark" ? "text" : "number",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
              }),
            };
          });
        let mergedColumns = [
          {
            title: "Name",
            dataIndex: "studentName",
            key: "studentName",
            editable: false,
            fixed: "left",
          },
          ...fcolumns,
          {
            title: "Total",
            dataIndex: "total",
            key: "total",
            editable: false,
          },
          {
            title: "Grade",
            dataIndex: "grade",
            key: "grade",
            editable: false,
          },
        ];
        if (!disableActions) {
          mergedColumns = [...mergedColumns, ...actColumns];
        }

        return { mergedColumns, templateColumns };
      },
    }
  );

  const {
    data: participants,
    isFetching: isPLoading,
    isSuccess: isPSuccess,
  } = useQuery<any, any, any, any>(
    ["course-participants", pagination.current, searchParticipantTerm],
    () => {
      return getSessionCourseParticipants({
        token,
        schoolId: schoolId as string,
        page: pagination.current,
        limit: pagination.pageSize,
        courseId: courseId,
        levelId: levelId,
        sessionId: sessionId,

        searchTerm: searchParticipantTerm,
      });
    },
    {
      onError: (err) => {
        openNotification({
          state: "error",
          title: "Error Occurred",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      onSuccess: (data) => {
        setPagination((pag) => ({ ...pag, total: data.total }));
      },
      select: (res: any) => {
        const result = res.data.data;

        const ans = result.map((item: any) => ({
          key: item.data.id,
          id: item.data.id,
          studentName: `${item.user?.name}(${item.data.student.id_number})`,
          ...JSON.parse(item.data.break_down),

          grade: item.data.grade,
          total: item.data.total,
        }));

        return { data: ans, total: res.data.meta.total };
      },
    }
  );

  return (
    <div>
      {/* <p>
        Each course teacher should have his/her own copy of this where they can
        score student
      </p> */}
      {/* <p>
        Or the primary teacher can allow for a course teacher to be able to edit
        (although copies cant be case in case)
      </p> */}
      {isSuccess && isPSuccess && (
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            columns={templateData.mergedColumns}
            pagination={pagination}
            onChange={(newPagination: TablePaginationConfig) => {
              setPagination((val) => ({
                ...val,
                total: participants.total,
                current: newPagination.current,
              }));
              setEditingKey("");
            }}
            loading={isPLoading}
            dataSource={participants.data}
            scroll={{ x: "max-content" }}
            size="small"
          />
        </Form>
      )}
    </div>
  );
};

export default CourseParticipantTable;
