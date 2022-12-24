import { DiYeoman } from "react-icons/di";
import { MenuProps, Typography } from "antd";
import { Layout, Menu } from "antd";
import React from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";
import { TCSchool } from "../../contexts/GlobalContextProvider";
import { ILink } from "../../data/dashboard";

const { Sider } = Layout;

interface IProps {
  handleLogout: Function;
  currentSchool: TCSchool;
  links: ILink[];
  isMenuCollapsed: boolean;
  setIsMenuCollapsed: Function;
}
const Sidebar = ({
  currentSchool,
  handleLogout,
  links,
  isMenuCollapsed,
  setIsMenuCollapsed,
}: IProps) => {
  const items: MenuProps["items"] = links.map((item, index) => ({
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
  return (
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
            JSON.parse(localStorage.getItem("isMenuCollapsed") as string)) ||
          isMenuCollapsed
        ) && (
          <Typography.Text
            style={{ color: "#fff", textTransform: "uppercase" }}
            strong
          >
            {currentSchool.name}
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
  );
};

export default Sidebar;
