import { Avatar, Divider, Skeleton, Space, Table, Tag, Typography } from "antd";
import React from "react";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { IAuthDets } from "../../../appTypes/auth";
import { openNotification } from "../../../helpers/notifications";
import { getSingleStaff } from "../../../helpers/staff";

interface IProps {
  staffId: string;
}

const Profile = ({ staffId }: IProps) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Members",
      dataIndex: "memberCount",
      key: "memberCount",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];
  const data = [
    {
      name: "Grad Commitee",
      memberCount: 9,
      role: "Admin",
    },
    {
      name: "Cleaning",
      memberCount: 4,
      role: "Member",
    },
  ];
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const { data: staff, isFetching } = useQuery(
    ["single-staff", staffId],
    () => {
      return getSingleStaff({
        token,
        schoolId: schoolId as string,
        staffId,
      });
    },
    {
      onError: (err: any) => {
        openNotification({
          state: "error",
          title: "Error occures",
          description: `Oops, an err occured: ${err?.message}`,
        });
      },
      onSuccess: (res: any) => {
        // const result = res.data.data;

        console.log("staff concern", res);
      },
      select: (res: any) => {
        const result = res.data.data;
        console.log("single-staff", result);

        interface IReturnProps {
          id: number;
          name: string;
          photo?: string;
          email: string;
          staffNo: string;
          isActive: boolean;
        }

        const ans: IReturnProps = {
          id: result.id,
          name: result.user.name,
          photo: result.user.profile_photo_url,
          email: result.user.email,
          staffNo: result.staff_no,
          isActive: result.isActive,
        };
        return ans;
      },
    }
  );

  // const ftch staff data
  return (
    <div className="mt-4 flex flex-col gap-12">
      {isFetching ? (
        <Skeleton active paragraph={{ rows: 30 }} />
      ) : (
        <div className="grid md:grid-cols-6 gap-8">
          {/* info */}
          <div className="flex flex-col gap-6 col-span-4">
            <div>
              <h4 className="text-4xl text-sky-800 mb-0 capitalize">
                {staff?.name}
              </h4>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.{" "}
            </p>
            <div>
              <h5 className="text-lg">Proficiencies</h5>
              <Space>
                {["Physics", "Chemistry", "English"].map((item) => (
                  <Tag>{item}</Tag>
                ))}
              </Space>
            </div>
            <div>
              <h5 className="text-lg">Skills</h5>
              <Space>
                {["Soccer", "Management", "Coding"].map((item) => (
                  <Tag>{item}</Tag>
                ))}
              </Space>
            </div>
          </div>
          {/* avatar */}
          <div className="md:col-start-5 col-span-2 md:pl-14 flex flex-col gap-4 border-l-2">
            <Avatar shape="square" size={200} src={staff?.photo} />
            <div className="bg-slate-800 rounded-md px-2 pt-3 w-max">
              <span className="text-xs text-white">Staff Number</span>
              <p className="text-2xl font-bold text-slate-400">
                {staff?.staffNo}
              </p>
            </div>
            <div>
              {/* <h5 className="text-lg">Resume</h5> */}
              <Space>
                <Tag color="#104a8e" className="cursor-pointer">
                  {"Download Resume"}
                </Tag>
              </Space>
            </div>
          </div>
        </div>
      )}
      <Divider />
      <div className="flex flex-col gap-2">
        <Typography.Title level={4}>
          <span className="text-slate-400">Groups</span>{" "}
        </Typography.Title>
        <Table
          dataSource={data}
          columns={columns}
          size="small"
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default Profile;
