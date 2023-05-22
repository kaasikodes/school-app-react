import {
  LogoutOutlined,
  LoadingOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { MdSettings } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { TbSchool } from "react-icons/tb";
import { Avatar, Badge, Button, Dropdown, Modal, Select, Space } from "antd";
import { Menu } from "antd";
import React, { useContext, useState } from "react";
import { IconType } from "react-icons";
import { openNotification } from "../../helpers/notifications";
import { ERole } from "../../appTypes/roles";
import { Link } from "react-router-dom";
import { IUser } from "../../appTypes/auth";
import {
  EGlobalOps,
  GlobalContext,
  TCSchool,
} from "../../contexts/GlobalContextProvider";
import { TSession } from "../../appTypes/sessions";
import { routes } from "../../routes";
import { useGetUserByEmail } from "../../helpersAPIHooks/users/useFetchSingleUser";
import useApiAuth from "../../hooks/useApiAuth";

interface IProps {
  setShowMobileMenu: Function;
  currentSchool: TCSchool;
  sessions?: TSession[];
  user: IUser;
  handleLogout: Function;
}
const TopActions = ({
  setShowMobileMenu,
  currentSchool,
  sessions,
  user,
  handleLogout,
}: IProps) => {
  const globalCtx = useContext(GlobalContext);
  const { dispatch: globalDispatch } = globalCtx;
  const currentUserRole = currentSchool?.currentRole as string;
  const [isSwitchRoleModalOpen, setIsSwitchRoleModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(ERole.NONE);
  const { userEmail } = useApiAuth();
  const { data: upToDateUser } = useGetUserByEmail({ email: userEmail });

  const handleRoleChange = (value: ERole) => {
    setSelectedRole(value);
  };

  const handleRoleSwitch = () => {
    openNotification({
      state: "info",
      title: "Wait a minute",
      description: <LoadingOutlined />,
    });
    // TO DO
    // make in sync with DB (that is the user role in current school)

    globalDispatch({
      type: EGlobalOps.setRoleInCurrentSchool,
      payload: selectedRole,
    });
    window.location.reload();
  };

  const userMenu = (
    <Menu
      style={{ width: "200px" }}
      items={[
        {
          label: <Link to={routes.index}>My Profile</Link>,
          key: "lis",
          icon: React.createElement(TbSchool as IconType),
          title: "My Profile",
        },

        {
          label: <Link to={routes.schools}>Manage Schools</Link>,
          key: "1",
          icon: React.createElement(TbSchool as IconType),
          title: "Manage Schools",
        },
        {
          label: <Link to={routes.inviteUsers}>Invite users</Link>,
          key: "OO",
          icon: React.createElement(TbSchool as IconType),
          title: "Invite users",
        },
        {
          label: <Link to={routes.sessions}>Manage Sessions</Link>,
          key: "sessions",
          icon: React.createElement(TbSchool as IconType),
          title: "Manage Sessions ",
        },

        {
          label: `Switch role (${currentUserRole})`,
          key: "3",
          title: "Switch role",
          onClick: () => setIsSwitchRoleModalOpen(true),

          icon: React.createElement(HiOutlineSwitchHorizontal as IconType),
        },
        {
          type: "divider",
        },
        {
          icon: React.createElement(LogoutOutlined as IconType),
          label: "Logout",
          key: "0",
          onClick: () => handleLogout(),
        },
      ]}
    />
  );
  return (
    <>
      {/* the switch role Modal */}
      <Modal
        title="Select a Role to switch to"
        open={isSwitchRoleModalOpen}
        onOk={handleRoleSwitch}
        okText="Switch"
        onCancel={() => setIsSwitchRoleModalOpen(false)}
      >
        <Select
          defaultValue={currentSchool?.currentRole}
          className="w-full"
          onChange={handleRoleChange}
        >
          {currentSchool.roles?.map((item: any) => (
            <Select.Option key={item} id={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Modal>
      <div className="h-12 w-full bg-white shadow-md fixed z-10 px-4 flex items-center ">
        <div className="flex justify-between items-center w-full">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setShowMobileMenu(true)}
          />
          <Space align="center">
            <div className="hidden md:block">
              <Select
                defaultValue={currentSchool.currentSessionId}
                options={sessions?.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                placeholder="Select a session"
                className=" hidden md:block md:mr-2 w-52"
              />
            </div>
            <div className="block md:hidden">
              <Button type="text" icon={<SearchOutlined />} />
            </div>
            {currentUserRole === ERole.ADMIN && (
              <Link to={routes.settings}>
                <MdSettings
                  size={23}
                  className="text-[#072A6C] font-bold cursor-pointer"
                />
              </Link>
            )}

            <Badge dot size="small">
              <Link to={routes.notifications}>
                <IoIosNotifications
                  className="text-blue-400 font-bold "
                  style={{ color: "#072A6C", fontSize: "1.2rem" }}
                  size={23}
                />
              </Link>
            </Badge>
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <Avatar
                src={upToDateUser?.photo}
                className=" border-sky-500 border-2 cursor-pointer"
              />
            </Dropdown>
          </Space>
        </div>
      </div>
    </>
  );
};

export default TopActions;
