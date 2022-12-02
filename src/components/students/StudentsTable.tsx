import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Menu,
  Space,
  Table,
  TablePaginationConfig,
} from "antd";
import { ColumnsType } from "antd/lib/table";

import React, { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { IAuthDets } from "../../appTypes/auth";
import { MoreOutlined } from "@ant-design/icons";

import { openNotification } from "../../helpers/notifications";
import { getAllStudents } from "../../helpers/students";
import EnrollExistingStudentForm from "./EnrollExistingStudentForm";

export interface IStudentEntry {
  id: string;
  photo?: string;
  name: string;
  studentNo: string;
  currentClass: string;
  nextClass?: string;
  enrollmentStatus?: boolean;
  sessionPaymentStatus: "complete" | "part" | "not paid";
}

enum EComp {
  ENROLL_EXISTING_STUDENT = "Enroll Existing Student",
  VIEW_STUDENT_ENROLLMENT_DETAILS = "Enrollment Details",
  NO_COMP = "",
}

const StudentsTable = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const sessionId = authDetails.choosenSchoolCurrentSessionId ?? "1";

  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 4,
    total: 0,
    showSizeChanger: false,
  });
  const { data, isLoading, isSuccess, error, refetch } = useQuery<
    any,
    any,
    any,
    any
  >(
    ["students", pagination.current],
    () => {
      return getAllStudents({
        token,
        schoolId: schoolId as string,
        page: pagination.current,
        limit: pagination.pageSize,
        sessionId,
        searchTerm,
      });
    },
    {
      refetchOnWindowFocus: false,
      onError: (err) => {
        openNotification({
          state: "error",
          title: "Error occures",
          description: `Oops, an err occured: ${err?.message}`,
        });
      },
      onSuccess: (data) => {
        setPagination((pag) => ({ ...pag, total: data.total }));
      },
      select: (res: any) => {
        const result = res.data.data;
        console.log("student", result);

        const data = result.map(
          (item: any): IStudentEntry => ({
            id: item.data.id,
            name: item.user.name,
            studentNo: item.data.id_number,
            photo: item.user.profile_photo_url ?? "",
            currentClass: item.currentLevel.name,
            sessionPaymentStatus: "not paid",
            enrollmentStatus: item.currentSessionEnrollmentStatus,
          })
        );
        return {
          data: data,
          limit: 4,
          total: res.data.meta.total,
        };
      },
    }
  );
  const onChange = (newPagination: TablePaginationConfig) => {
    setPagination(() => ({
      ...newPagination,
    }));
  };
  const [openD, setOpenD] = useState(false);
  const closeDrawer = () => {
    setOpenD(false);
  };
  const [comp, setComp] = useState<EComp>(EComp.NO_COMP);
  const [studentId, setStudentId] = useState("");
  const handleDrawerComp = (props: { id: string; comp: EComp }) => {
    setStudentId(props.id);
    setComp(props.comp);
    setOpenD(true);
  };
  const columns: ColumnsType<IStudentEntry> = [
    {
      title: "",
      dataIndex: "photo",
      key: "photo",
      width: 50,
      render: (text: any) => <Avatar src={`${text}`} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: string, record: IStudentEntry) => (
        <Link to={`students/${record.id}`}>{record.name}</Link>
      ),
    },
    {
      title: "ID",
      dataIndex: "studentNo",
      key: "studentNo",
    },
    {
      title: "Current Class",
      dataIndex: "currentClass",
      key: "currentClass",
    },
    {
      title: "Enrolled in Session",
      dataIndex: "enrollmentStatus",
      key: "enrollmentStatus",
      render: (val: boolean) => (val ? "Yes" : "No"),
    },
    {
      title: "Payment Status",
      dataIndex: "sessionPaymentStatus",
      key: "sessionPaymentStatus",
      render: (val) => <span className="capitalize">{val}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 40,
      render: (_: any, record: IStudentEntry) => (
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  key: "0",
                  label: (
                    <button
                      className="w-full text-left"
                      onClick={() =>
                        handleDrawerComp({
                          id: record.id,
                          comp: EComp.ENROLL_EXISTING_STUDENT,
                        })
                      }
                    >
                      Enroll Student for Session
                    </button>
                  ),
                  disabled: record.enrollmentStatus,
                },
                {
                  key: "1",
                  label: (
                    <Link
                      className="w-full text-left"
                      to={`/students/${record.id}/assign-course`}
                    >
                      Assign Courses
                    </Link>
                  ),
                  disabled: record.enrollmentStatus ? false : true,
                },
                {
                  key: "2",
                  label: (
                    <button
                      className="w-full text-left"
                      onClick={() =>
                        handleDrawerComp({
                          id: record.id,
                          comp: EComp.VIEW_STUDENT_ENROLLMENT_DETAILS,
                        })
                      }
                    >
                      View Enrollment Details
                    </button>
                  ),
                  disabled: record.enrollmentStatus ? false : true,
                },

                {
                  key: "5",
                  label: (
                    <Link to={`/staff/${record.id}`}>
                      <a className="w-full text-left">Student Profile</a>
                    </Link>
                  ),
                },
              ]}
            />
          }
          trigger={["click"]}
        >
          <Space>
            <Button icon={<MoreOutlined />} type="text" />
          </Space>
        </Dropdown>
      ),
    },
  ];
  const drawerSize =
    comp === EComp.ENROLL_EXISTING_STUDENT ? "large" : "default";
  return (
    <div>
      <Drawer open={openD} onClose={closeDrawer} title={comp} size={drawerSize}>
        {comp === EComp.ENROLL_EXISTING_STUDENT && (
          <EnrollExistingStudentForm
            handleClose={closeDrawer}
            studentId={studentId}
          />
        )}
      </Drawer>
      {isSuccess && (
        <Table
          rowKey={(record) => record.id}
          dataSource={data?.data}
          columns={columns}
          onChange={onChange}
          pagination={pagination}
          loading={isLoading}
          size="small"
        />
      )}
    </div>
  );
};

export default StudentsTable;
