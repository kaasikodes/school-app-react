import {
  Button,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Menu,
  Popconfirm,
  Space,
  Table,
  Typography,
} from "antd";
import React, { useState } from "react";
import { EllipsisOutlined, EditOutlined } from "@ant-design/icons";
import { getCRTemplate } from "../../helpers/schoolCRecordTemplates";

import { openNotification } from "../../helpers/notifications";
import { useQuery } from "react-query";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";

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
interface IParticipantEntry {
  key: string;
  id: string;
  studentName: string;

  grade: string;
  total: number;
}

const originData: IParticipantEntry[] = Array(50)
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

const CourseParticipantTable = () => {
  const [form] = Form.useForm();
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;

  const [breakDownKeys, setbreakDownKeys] = useState<string[]>([]);

  const [data, setData] = useState(originData);
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

      // upadate backend b4 you can do anything here

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        console.log("Tab is here");
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
        setData(() => newData);
        setEditingKey("");
      } else {
        console.log(" Other Tab is here");

        newData.push(row);
        setData(() => newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
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
                  <a>Cancel</a>
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

  const {
    data: mergedColumns,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useQuery<any, any, any, any>(
    ["course-record-templates", 2],
    () => {
      return getCRTemplate({
        token,
        id: "4",
      });
    },
    {
      onError: (err) => {
        openNotification({
          state: "error",
          title: "Error occures",
          description: `Oops, an err occured: ${err?.message}`,
        });
      },
      onSuccess: (columns) => {
        const brkKeys: string[] = [];
        columns.forEach(
          (item: any) => item.editable && brkKeys.push(item.dataIndex)
        );
        setbreakDownKeys(brkKeys);
        console.log("settled =>", brkKeys);
      },
      select: (res: any) => {
        const result = res.data.data;

        console.log("CRT", JSON.parse(result.break_down));
        const columns = JSON.parse(result.break_down);

        const fcolumns = columns
          .map((item: any) => ({
            title: item.name,
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
        const mergedColumns = [
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
          ...actColumns,
        ];
        console.log("ANSWERS +>", mergedColumns);

        return mergedColumns;
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
      {isSuccess && (
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            columns={mergedColumns}
            pagination={{
              onChange: handleCancel,
            }}
            loading={isLoading}
            dataSource={data}
            scroll={{ x: "max-content" }}
            size="small"
          />
        </Form>
      )}
    </div>
  );
};

export default CourseParticipantTable;
