import {
  Space,
  Table,
  Menu,
  Dropdown,
  Button,
  Drawer,
  Modal,
  TablePaginationConfig,
} from "antd";
import { useState } from "react";
import { endSchoolSession } from "../../../helpers/sessions";
import { EllipsisOutlined } from "@ant-design/icons";
import EditSessionForm from "./EditSessionForm";
import ViewSession from "./ViewSession";
import { openNotification } from "../../../helpers/notifications";
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import OfflineComponent from "../../errors/OfflineComponent";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../../appTypes/auth";
import { useFetchSessions } from "../../../helpersAPIHooks/sessions";

export interface ISessionEntry {
  id: number;
  name: string;
  starts: string;
  ends?: string;
  duration: string;
  levelCount: number;
  courseCount: number;
  parentCount: number;
  studentCount: number;
  staffCount: number;
  description?: string;
}
enum EAction {
  VIEW_SESSION = "View Session",
  EDIT_SESSION = "Edit Session",
  NO_COMP = "NO COMP",
}

interface IProps {
  refresh: boolean;
  setRefresh: Function;
  searchTerm?: string;
}

const SessionsTable = ({ refresh, setRefresh, searchTerm }: IProps) => {
  const [error, setError] = useState(false);
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const [showDrawer, setShowDrawer] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [action, setAction] = useState<EAction>(EAction.NO_COMP);

  // pheripherals
  const handleEdit = (id: string) => {
    setAction(EAction.EDIT_SESSION);
    setSessionId(id);
    setShowDrawer(true);
  };
  const handleView = (id: string) => {
    setAction(EAction.VIEW_SESSION);
    setSessionId(id);
    setShowDrawer(true);
  };
  const handleEndSession = (id: string, name: string) => {
    Modal.confirm({
      title: "End Session",
      icon: <ExclamationCircleOutlined className="text-red-500" />,
      content: "Are you sure you want to end this session ?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        openNotification({
          state: "info",
          title: "Wait a minute",
          description: <LoadingOutlined />,
        });

        endSchoolSession({
          token,
          schoolId: schoolId as string,
          sessionId: id,
        })
          .then((res: any) => {
            console.log(res);
            setRefresh((val: boolean) => !val);

            openNotification({
              state: "success",
              title: "Success",
              description: `${name}  has come to an end!`,
            });
          })
          .catch((err: any) => {
            console.log(err);
            openNotification({
              state: "error",
              title: "Error occures",
              description: `${name} was not ended`,
            });
          });
      },
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "No of Classes",
      dataIndex: "levelCount",
      key: "levelCount",
    },
    {
      title: "No of Courses",
      dataIndex: "courseCount",
      key: "courseCount",
    },
    {
      title: "Total Students",
      dataIndex: "studentCount",
      key: "studentCount",
    },
    {
      title: "Total Parents",
      dataIndex: "parentCount",
      key: "parentCount",
    },
    {
      title: "Total Staff",
      dataIndex: "staffCount",
      key: "staffCount",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  key: "1",
                  label: (
                    <button
                      onClick={() => handleEdit(record.id)}
                      className="w-full text-left"
                    >
                      Edit
                    </button>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <button
                      onClick={() => handleView(record.id)}
                      className="w-full text-left"
                    >
                      View
                    </button>
                  ),
                },
                {
                  key: "3",
                  label: (
                    <button
                      onClick={() => handleEndSession(record.id, record.name)}
                      disabled={record?.ends}
                      className="w-full text-left text-red-500 disabled:text-red-200 disabled:cursor-not-allowed"
                    >
                      <span>End Session</span>
                    </button>
                  ),
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
      ),
    },
  ];
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    showSizeChanger: false,
  });

  const { data: sessions, isFetching } = useFetchSessions({
    token,
    schoolId: schoolId as string,
    pagination: {
      page: pagination.current,
      limit: pagination.pageSize,
    },
    searchParams: {
      name: searchTerm,
    },
  });

  const onChange = (newPagination: TablePaginationConfig) => {
    setPagination(() => ({
      ...newPagination,
    }));
  };

  return (
    <div>
      {error ? (
        <OfflineComponent />
      ) : (
        <div>
          <Table
            rowKey={(record) => record.id}
            dataSource={sessions?.data ?? []}
            columns={columns}
            onChange={onChange}
            pagination={pagination}
            loading={isFetching}
            size="small"
            scroll={{ x: "max-content" }}
          />
          <Drawer
            open={showDrawer}
            onClose={() => setShowDrawer(false)}
            title={action}
          >
            {action === EAction.EDIT_SESSION && (
              <EditSessionForm
                closeDrawer={() => setShowDrawer(false)}
                setRefresh={setRefresh}
                id={sessionId}
              />
            )}
            {action === EAction.VIEW_SESSION && <ViewSession id={sessionId} />}
          </Drawer>
        </div>
      )}
    </div>
  );
};

export default SessionsTable;
