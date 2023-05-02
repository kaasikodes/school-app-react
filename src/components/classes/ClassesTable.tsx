import {
  Space,
  Table,
  Menu,
  Dropdown,
  Button,
  Drawer,
  TablePaginationConfig,
} from "antd";
import { useEffect, useState } from "react";

import { getClasses } from "../../helpers/classes";
import { EllipsisOutlined } from "@ant-design/icons";
import EditClassForm from "./EditClassForm";
import ViewClass from "./ViewClass";

import OfflineComponent from "../errors/OfflineComponent";
import { Link } from "react-router-dom";
import { IAuthDets } from "../../appTypes/auth";
import { useAuthUser } from "react-auth-kit";

export interface IClassEntry {
  id: number | string;
  name: string;

  courseCount?: number;
  studentCount?: number;
  teacherCount?: number;

  description?: string;
}
enum EAction {
  VIEW = "View Class",
  EDIT = "Edit Class",
  NO_COMP = "NO COMP",
}

interface IProps {
  refresh: boolean;
  setRefresh: Function;
  searchTerm?: string;
}

const ClassesTable = ({ refresh, setRefresh, searchTerm }: IProps) => {
  const [classes, setClasses] = useState<IClassEntry[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;

  const [showDrawer, setShowDrawer] = useState(false);
  const [classId, setClassId] = useState("");
  const [action, setAction] = useState<EAction>(EAction.NO_COMP);

  // pheripherals
  const handleEdit = (id: string) => {
    setAction(EAction.EDIT);
    setClassId(id);
    setShowDrawer(true);
  };
  const handleView = (id: string) => {
    setAction(EAction.VIEW);
    setClassId(id);
    setShowDrawer(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: string, record: any) => (
        <Link to={`/classes/${record.id}`}>
          <a>{_}</a>
        </Link>
      ),
    },

    {
      title: "No of Courses",
      dataIndex: "courseCount",
      key: "courseCount",
    },
    {
      title: "Class Students",
      dataIndex: "studentCount",
      key: "studentCount",
    },
    {
      title: "Total Teachers",
      dataIndex: "teacherCount",
      key: "teacherCount",
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

  const loadClasses = async (
    newPagination: TablePaginationConfig,
    searchTerm?: string
  ) => {
    if (token) {
      try {
        setFetching(true);
        if (schoolId) {
          const res = await getClasses({
            token,
            schoolId: schoolId,
          });
          const result = res.data.data;
          setPagination((pagination) => ({
            ...pagination,
            total: res.data.total,
          }));

          const fclasses: IClassEntry[] = result.map((item: any) => {
            return {
              id: item.id,
              name: item.name,

              levelCount: 0,
              courseCount: 0,
              parentCount: 0,
              studentCount: 0,
              teacherCount: 0,
              ends: item.ends,
            };
          });
          setClasses(fclasses);
          setFetching(false);
        }
      } catch (err: any) {
        setFetching(false);
        setError(true);
      }
    }
  };
  const onChange = (newPagination: TablePaginationConfig) => {
    setPagination((pagination) => ({
      ...newPagination,
    }));
    loadClasses(newPagination);
  };
  // pheripherals
  useEffect(() => {
    // const token = localStorage.getItem(LOCAL_USER_TOKEN_KEY);
    loadClasses(
      {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
      searchTerm
    );
  }, [token, refresh, searchTerm]);
  return (
    <div>
      {error ? (
        <OfflineComponent />
      ) : (
        <div>
          <Table
            rowKey={(record) => record.id}
            dataSource={classes}
            columns={columns}
            onChange={onChange}
            pagination={pagination}
            loading={fetching}
            size="small"
            scroll={{ x: "max-content" }}
          />
          <Drawer
            visible={showDrawer}
            onClose={() => setShowDrawer(false)}
            title={action}
          >
            {action === EAction.EDIT && (
              <EditClassForm
                closeDrawer={() => setShowDrawer(false)}
                id={classId}
              />
            )}
            {action === EAction.VIEW && (
              <ViewClass
                id={classId}
                closeDrawer={() => setShowDrawer(false)}
              />
            )}
          </Drawer>
        </div>
      )}
    </div>
  );
};

export default ClassesTable;
