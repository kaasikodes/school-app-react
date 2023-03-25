import { useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Dropdown,
  Menu,
  Space,
  Table,
  TablePaginationConfig,
} from "antd";
import { getCourses } from "../../../helpers/courses";

import { useQuery } from "react-query";

import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../../appTypes/auth";
import { Link } from "react-router-dom";

export interface ICourseEntry {
  id: string;
  name: string;
  description?: string;
  department?: string;
  isActive: boolean;
  levelCount: number;
  studentCount: number;
  teacherCount: number;
  addedBy: string;
  createdAt: string;
}
enum EAction {
  VIEW = "View Course",
  EDIT = "Edit Course",
  ADD_TEACHER = "Assign Teacher to Course",
  ASSIGN_CLASS = "Assign Class to Course",
  NO_COMP = "NO COMP",
}

interface IProps {
  searchTerm?: string;
}

const SchoolCoursesTable = ({ searchTerm }: IProps) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const [courses, setCourses] = useState<ICourseEntry[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [courseId, setCourseId] = useState(0);
  const [courseName, setCourseName] = useState("");
  const [action, setAction] = useState<EAction>(EAction.NO_COMP);
  const handleAssignTeacher = (id: number, name: string) => {
    setAction(EAction.ADD_TEACHER);
    setCourseId(id);
    setCourseName(name);
    setShowDrawer(true);
  };
  const handleAssignClass = (id: number, name: string) => {
    setAction(EAction.ASSIGN_CLASS);
    setCourseId(id);
    setCourseName(name);
    setShowDrawer(true);
  };
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 4,
    showSizeChanger: false,
  });
  const onChange = (newPagination: TablePaginationConfig) => {
    setPagination(() => ({
      ...newPagination,
    }));
  };
  const { data, isLoading, isError, isFetched, isSuccess } = useQuery<
    any,
    any,
    any,
    any
  >(
    ["courses", pagination.current],
    () =>
      getCourses({
        token,
        schoolId: schoolId as string,
      }),

    {
      onSuccess: (res: any) => {
        const result = res.data.data;
        setPagination((pagination) => ({
          ...pagination,
          total: res.data.total,
        }));

        const fCourses: ICourseEntry[] = result.map(
          (item: any): ICourseEntry => ({
            id: item.id,
            name: item.name,
            description: item.description,
            department: item?.department_id,
            isActive: item.isActive,
            levelCount: item?.levelCount,
            studentCount: item?.studentCount,
            teacherCount: item?.teacherCount,
            addedBy: item?.addedBy,
            createdAt: item?.created_at,
          })
        );

        setCourses(fCourses);
      },
    }
  );
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: string, record: any) => (
        <Link to={`courses/${record.id}`}>{record.name}</Link>
      ),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (val: any) => (!!val === true ? "Yes" : "No"),
    },

    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "No of Teachers",
      dataIndex: "teacherCount",
      key: "teacherCount",
    },
    {
      title: "Total classes",
      dataIndex: "levelCount",
      key: "levelCount",
    },
    {
      title: "Total Participants",
      dataIndex: "studentCount",
      key: "studentCount",
    },
    {
      title: "Author",
      dataIndex: "addedBy",
      key: "addedBy",
    },
    // {
    //   title: "Created on",
    //   dataIndex: "createdBy",
    //   key: "createdBy",
    // },

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
                  key: "-1",
                  label: (
                    <button
                      className="w-full text-left"
                      onClick={() => handleAssignClass(record.id, record.name)}
                    >
                      Assign Course to Class(es)
                    </button>
                  ),
                },
                {
                  key: "1",
                  label: <button className="w-full text-left">Edit</button>,
                },
                {
                  key: "2",
                  label: <button className="w-full text-left">View</button>,
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
  return (
    <div>
      <Table
        rowKey={(record) => record.id}
        dataSource={courses}
        columns={columns}
        onChange={onChange}
        pagination={pagination}
        loading={isLoading}
        size="small"
        scroll={{ x: "max-content" }}
      />
      <Drawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        title={`${action}`}
      >
        {/* {action === EAction.ADD_TEACHER && <AssignCourseTeacher />} */}
      </Drawer>
    </div>
  );
};

export default SchoolCoursesTable;
