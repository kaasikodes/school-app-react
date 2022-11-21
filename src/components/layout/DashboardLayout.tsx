import {
  ApartmentOutlined,
  AuditOutlined,
  CalculatorOutlined,
  LogoutOutlined,
  BookOutlined,
  CheckSquareOutlined,
  UserOutlined,
  LoadingOutlined,
  NotificationOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { BsFillCalendarCheckFill, BsFileEarmarkPostFill } from "react-icons/bs";
import { GiTeacher, GiSchoolOfFish } from "react-icons/gi";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { MdSettings } from "react-icons/md";
import { RiParentLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoIosNotifications, IoMdClose } from "react-icons/io";
import { DiYeoman } from "react-icons/di";
import { TbSchool } from "react-icons/tb";
import { FaSchool } from "react-icons/fa";
import { AiOutlineSchedule } from "react-icons/ai";
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Dropdown,
  Input,
  MenuProps,
  Modal,
  Select,
  Space,
  Typography,
} from "antd";
import { Layout, Menu } from "antd";

import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { logoutUser } from "../../helpers/auth";
import axios from "axios";
import { openNotification } from "../../helpers/notifications";
import { updateUserChoosenRoleInSchool } from "../../helpers/users";
import { ERole } from "../../appTypes/roles";
import { dashboardSideMenuLinks } from "../../data/dashboard";
import MobileMenu from "./MobileMenu";
import { Link, useNavigate } from "react-router-dom";
import { IAuthDets } from "../../appTypes/auth";

axios.defaults.withCredentials = true;

const { Header, Content, Footer, Sider } = Layout;

type Props = {
  children: JSX.Element;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const authDetails = auth() as unknown as IAuthDets;
  const schoolName = authDetails.schools.find(
    (item) => item.id === authDetails.choosenSchoolId
  )?.name;

  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  const [selectedRole, setSelectedRole] = useState(ERole.NONE);
  const [isSwitchRoleModalOpen, setIsSwitchRoleModalOpen] = useState(false);
  // the rolesAvailableToUser should be in a context
  const rolesAvailableToUser = authDetails?.possibleUserRolesInChoosenSchool
    ? authDetails?.possibleUserRolesInChoosenSchool
    : [ERole.NONE];

  const currentUserRoleInChoosenSchool =
    authDetails?.currentUserRoleInChoosenSchool;

  const token = authDetails.userToken;
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser({ token, id: authDetails.user.id })
      .then(() => {
        signOut();
        navigate("/login");
      })
      .catch((e: any) => {
        console.log("something went wrong ...");
      });
  };
  const handleRoleChange = (value: ERole) => {
    console.log(value, "FRom");
    setSelectedRole(value);
  };
  const handleRoleSwitch = () => {
    openNotification({
      state: "info",
      title: "Wait a minute",
      description: <LoadingOutlined />,
    });

    updateUserChoosenRoleInSchool({
      token,
      schoolId: "4",
      userId: " 7",
      role: selectedRole,
    })
      .then((res: any) => {
        openNotification({
          state: "success",
          title: "Success",
          description: `${selectedRole}  is now your role in  the school you\'re currently on!`,
        });
        setIsSwitchRoleModalOpen(false);
      })
      .catch((err: any) => {
        console.log(err);
        openNotification({
          state: "error",
          title: "Error occures",
          description: `Issue switching to ${selectedRole}!`,
        });
      });
  };
  const userMenu = (
    <Menu
      style={{ width: "200px" }}
      items={[
        {
          label: <Link to="/user-profile">My Profile</Link>,
          key: "lis",
          icon: React.createElement(TbSchool as IconType),
          title: "My Profile",
        },
        {
          label: <Link to="/schools">Transfer Admin Rights</Link>,
          key: "c",
          icon: React.createElement(TbSchool as IconType),
          title: "Transfer Admin Rights",
        },
        {
          label: <Link to="/schools">Switch School</Link>,
          key: "1",
          icon: React.createElement(TbSchool as IconType),
          title: "Switch school",
        },

        {
          label: `Switch role (${currentUserRoleInChoosenSchool})`,
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
          onClick: handleLogout,
        },
      ]}
    />
  );
  const menuLinks = dashboardSideMenuLinks({
    role: currentUserRoleInChoosenSchool
      ? currentUserRoleInChoosenSchool
      : ERole.NONE,
  });

  const items: MenuProps["items"] = menuLinks.map((item, index) => ({
    key: String(index + 1),
    icon:
      item.link !== "/logout" ? (
        React.createElement(item.icon as IconType)
      ) : (
        <div className="mt-4 mb-4">
          {React.createElement(item.icon as IconType)}
        </div>
      ),
    label:
      item.link === "/logout" ? (
        <div className="mt-6 mb-4">
          <span>{item.label}</span>
        </div>
      ) : (
        <Link to={item.link}>{item.label}</Link>
      ),
    onClick: () => {
      if (item.link === "/logout") {
        // should open up modal to confirm logout
        // also make call to api to delete the token
        // dispatch({ type: EAuthOps.LOGOUT_USER });

        handleLogout();

        // alert("logout");
      }
    },
  }));
  // should be from context
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  if (typeof window !== "undefined") {
    return (
      <>
        {/* mobile menu */}

        <MobileMenu
          links={menuLinks}
          handleLogOut={handleLogout}
          onClose={() => setShowMobileMenu(false)}
          show={showMobileMenu}
        />
        {/* the switch role Modal */}
        <Modal
          title="Select a Role to switch to"
          visible={isSwitchRoleModalOpen}
          onOk={handleRoleSwitch}
          okText="Switch"
          onCancel={() => setIsSwitchRoleModalOpen(false)}
        >
          <Select
            defaultValue={currentUserRoleInChoosenSchool}
            className="w-full"
            onChange={handleRoleChange}
          >
            {typeof rolesAvailableToUser === "object" &&
              rolesAvailableToUser?.map((item: any) => (
                <Select.Option key={item} id={item} value={item}>
                  {item}
                </Select.Option>
              ))}
          </Select>
        </Modal>
        {/* actual layout of app */}
        <Layout hasSider>
          <Sider
            // collapsedWidth={0}

            collapsible
            defaultCollapsed={
              !!localStorage.getItem("isMenuCollapsed")
                ? JSON.parse(localStorage.getItem("isMenuCollapsed") as string)
                : isMenuCollapsed
            }
            // collapsed={isMenuCollapsed}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",

              left: 0,
              top: 0,
              bottom: 0,
            }}
            className="z-20 custom-sidebar hidden md:block"
            onCollapse={(val) => {
              console.log(val, "are");
              // localStorage.removeItem("isMenuCollapsed");
              setIsMenuCollapsed(val);
              localStorage.setItem("isMenuCollapsed", JSON.stringify(val));
            }}
          >
            {/* the logo is buggy and will need to be fixed ....   */}
            <div className="flex justify-start pt-2 mb-4 gap-2 pl-4 items-center">
              <DiYeoman className=" text-4xl text-yellow-400" />
              {!(
                (!!localStorage.getItem("isMenuCollapsed") &&
                  JSON.parse(
                    localStorage.getItem("isMenuCollapsed") as string
                  )) ||
                isMenuCollapsed
              ) && (
                <Typography.Text
                  style={{ color: "#fff", textTransform: "uppercase" }}
                  strong
                >
                  {/* {currentSchool?.item.name
                    ? currentSchool?.item.name
                    : "School App"} */}
                  {schoolName}
                </Typography.Text>
              )}
            </div>

            <Menu
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={["4"]}
              items={items}
            />
          </Sider>

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
                    defaultValue={"1"}
                    options={[
                      { label: "Session 1", value: "1" },
                      { label: "Session 2", value: "2" },
                    ]}
                    placeholder="Select a session"
                    className=" hidden md:block md:mr-2 w-52"
                  />
                </div>
                <div className="block md:hidden">
                  <Button type="text" icon={<SearchOutlined />} />
                </div>
                <Link to={`/settings`}>
                  <MdSettings
                    size={23}
                    className="text-[#072A6C] font-bold cursor-pointer"
                  />
                </Link>

                <Badge dot size="small">
                  <IoIosNotifications
                    className="text-blue-400 font-bold "
                    style={{ color: "#072A6C", fontSize: "1.2rem" }}
                    size={23}
                  />
                </Badge>
                <Dropdown overlay={userMenu} trigger={["click"]}>
                  <Avatar
                    src={authDetails.user?.photo}
                    className=" border-sky-500 border-2 cursor-pointer"
                  />
                </Dropdown>
              </Space>
            </div>
          </div>

          <Layout
            className={`site-layout      ${
              (!!localStorage.getItem("isMenuCollapsed") &&
                JSON.parse(
                  localStorage.getItem("isMenuCollapsed") as string
                )) ||
              isMenuCollapsed
                ? "md:pl-12"
                : "md:pl-44"
            }`}
          >
            <Content className="px-4 md:px-12 mt-20">
              <div className="min-h-screen mb-12">{children}</div>
            </Content>
          </Layout>
        </Layout>
      </>
    );
  }
  return null;
};

export default DashboardLayout;
