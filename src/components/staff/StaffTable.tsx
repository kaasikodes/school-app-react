import React, { useState } from "react";
import {
  ExclamationCircleOutlined,
  LoadingOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
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
import { getCourses } from "../../helpers/courses";

import { useQuery } from "react-query";

import { getAllStaff } from "../../helpers/staff";
import { openNotification } from "../../helpers/notifications";
import EditStaffForm from "./EditStaff";
import AddRemoveStaffFomGroup from "./AddRemoveStaffFomGroup";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import { IAuthDets } from "../../appTypes/auth";

export interface IStaffEntry {
  id: number;
  name: string;
  staffNo: string;
  photo?: string;

  courseCount: number;
  groupCount: number;
}
enum EAction {
  VIEW = "View Staff",
  EDIT = "Edit Staff",
  ADD_TO_GROUP = "Add staff to group",
  NO_COMP = "NO COMP",
}

interface IProps {
  searchTerm?: string;
}

const StaffTable = ({ searchTerm }: IProps) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const [courses, setCourses] = useState<IStaffEntry[]>([]);
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
  const [staff, setStaff] = useState<IStaffEntry[]>([]);
  const { data, isLoading, isError, error, refetch } = useQuery<
    any,
    any,
    any,
    any
  >(
    ["staff", pagination.current],
    () => {
      return getAllStaff({
        token,
        schoolId: schoolId as string,
        page: pagination.current,
        limit: pagination.pageSize,

        searchTerm,
      });
    },
    {
      // cacheTime: 5000, // def->5min && isIndicated by isFetching , its how long data will be in cache if im not on the page
      //   staleTime: 30000, //def -> 0s && is the amount of time before your data is considered stale
      // refetchOnMount: false, def->true
      // refetchOnWindowFocus: true, def->true
      // Polling : fetching data at reqular intervals
      // refetchInterval: 2000, // def -> false
      // refetchIntervalInBackground: true, //wll still refetfch data if window loses focus
      // enabled:false && refetch  --> to allow fetching data based on events such as onClick
      onError: (err) => {
        openNotification({
          state: "error",
          title: "Error occures",
          description: `Oops, an err occured: ${err?.message}`,
        });
      },
      onSuccess: (res: any) => {
        const result = res.data.data;
        setPagination((pagination) => ({
          ...pagination,
          total: res.data.total,
        }));
        console.log("staff", result);
        const fStaff = result.map(
          (item: any): IStaffEntry => ({
            id: item.id,
            name: item.staff_no,
            staffNo: item.staff_no,
            photo: item?.photo,

            courseCount: item?.courseCount,
            groupCount: item?.groupCount,
          })
        );
        setStaff(() => fStaff);
      },
    }
  );
  const [showD, setShowD] = useState(false);
  const [comp, setComp] = useState<EAction>(EAction.NO_COMP);
  const [staffId, setStaffId] = useState<number | null>(null);
  const handleComp = ({ val, id }: { val: EAction; id: number }) => {
    setShowD(true);
    setComp(val);
    setStaffId(id);
  };
  const columns = [
    {
      title: "",
      dataIndex: "photo",
      key: "photo",
      render: (text: any) => <Avatar src={`${text}`} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: string, record: any) => (
        <Link to={`/staff/${record.id}`}>{record.name}</Link>
      ),
    },
    {
      title: "Staff ID",
      dataIndex: "staffNo",
      key: "staffNo",
    },

    {
      title: "No Course teaching",
      dataIndex: "courseCount",
      key: "courseCount",
    },
    {
      title: "No of groups",
      dataIndex: "groupCount",
      key: "groupCount",
    },

    {
      title: "Created on",
      dataIndex: "createdOn",
      key: "createdOn",
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
                      className="w-full text-left"
                      onClick={() =>
                        handleComp({ id: record.id, val: EAction.EDIT })
                      }
                    >
                      Edit Staff
                    </button>
                  ),
                },
                {
                  key: "2",
                  label: <button className="w-full text-left">View </button>,
                },
                {
                  key: "4",
                  label: (
                    <button
                      className="w-full text-left"
                      onClick={() =>
                        handleComp({ id: record.id, val: EAction.ADD_TO_GROUP })
                      }
                    >
                      Add/Remove from group
                    </button>
                  ),
                },
                {
                  key: "5",
                  label: (
                    <Link to={`/staff/${record.id}`}>
                      <a className="w-full text-left">Staff Profile</a>
                    </Link>
                  ),
                },
                {
                  key: "3",
                  label: (
                    <button className="w-full text-left">
                      Assign course to staff(1class, 2courses in class)
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
  return (
    <div>
      <Drawer visible={showD} onClose={() => setShowD(false)} title={comp}>
        {comp === EAction.EDIT && (
          <EditStaffForm closeDrawer={() => setShowD(false)} />
        )}
        {comp === EAction.ADD_TO_GROUP && (
          <AddRemoveStaffFomGroup closeDrawer={() => setShowD(false)} />
        )}
      </Drawer>

      <Table
        rowKey={(record) => record.id}
        dataSource={staff}
        columns={columns}
        onChange={onChange}
        pagination={pagination}
        loading={isLoading}
        size="small"
      />
    </div>
  );
};

export default StaffTable;