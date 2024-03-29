import { Divider, Skeleton, Space, Table, Tag, Typography } from "antd";
import { useContext } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { IAuthDets } from "../../../appTypes/auth";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";
import { getSingleAdmin } from "../../../helpers/admin";
import { openNotification } from "../../../helpers/notifications";
import { ProfileImage } from "./ProfileImage";

interface IProps {
  adminId: string;
}

const Profile = ({ adminId }: IProps) => {
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
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;

  const schoolId = globalState.currentSchool?.id;
  const { data: admin, isFetching } = useQuery(
    ["single-admin", adminId],
    () => {
      return getSingleAdmin({
        token,
        schoolId: schoolId as string,
        adminId,
      });
    },

    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      onError: (err: any) => {
        openNotification({
          state: "error",
          title: "Error occures",
          description: `Oops, an err occured: ${err?.message}`,
        });
      },
      onSuccess: (res: any) => {
        // const result = res.data.data;
      },
      select: (res: any) => {
        const result = res.data;

        interface IReturnProps {
          id: number;
          name: string;
          photo?: string;
          email: string;
          adminNo: string;
          isActive: boolean;
        }

        const ans: IReturnProps = {
          id: result.data.id,
          name: result.user.name,
          photo: result.user.profile_photo_path,
          email: result.user.email,
          adminNo: result.data.admin_no,
          isActive: result.data.isActive,
        };
        return ans;
      },
    }
  );

  // const ftch admin data
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
                {admin?.name}
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
            <ProfileImage />
            <a href={`mailto:${admin?.email}`}>{admin?.email}</a>
          </div>
        </div>
      )}
      <Divider />
      <div className="flex flex-col gap-2">
        <Typography.Title level={4}>
          <span className="text-slate-400">Groups</span>{" "}
        </Typography.Title>
        <Table dataSource={data} columns={columns} size="small" />
      </div>
    </div>
  );
};

export default Profile;
