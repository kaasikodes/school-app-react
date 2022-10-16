import {
  ApartmentOutlined,
  HomeOutlined,
  CalculatorOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CheckSquareOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import { MenuProps, Modal } from "antd";
import { Layout, Menu } from "antd";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

type Props = {
  children: JSX.Element;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  const menuLinks = [
    {
      icon: ApartmentOutlined,
      label: "Gatehouse",
      link: "/",
    },
    {
      icon: HomeOutlined,
      label: "Home",
      link: "/",
    },
    {
      icon: UserAddOutlined,
      label: "Estate Owners",
      link: "/estate-owners",
    },
    { icon: ApartmentOutlined, label: "Estates", link: "/estates" },
    {
      icon: UsergroupAddOutlined,
      label: "Staff",
      link: "/staff",
    },
    {
      icon: LogoutOutlined,
      label: "Logout",
      link: "/logout",
    },
  ];

  const items: MenuProps["items"] = menuLinks.map((item, index) => ({
    key: String(index + 1),
    icon:
      item.label !== "Gatehouse" ? (
        React.createElement(item.icon)
      ) : (
        <img
          src="/assets/brandlogo.png"
          className="mt-2 w-full h-8 object-contain"
        />
      ),
    disabled: item.label === "Gatehouse",
    label:
      item.label !== "Gatehouse" ? (
        <Link to={item.link}>{item.label}</Link>
      ) : null,
    onClick: (e) => {
      if (item.link === "/logout") {
        if (window.confirm("Are you sure?")) {
          handleLogout();
        }

        // should open up modal to confirm logout
        // also make call to api to delete the token
        // dispatch({ type: EAuthOps.LOGOUT_USER });
        // alert("logout");
      }
    },
  }));

  if (typeof window !== "undefined") {
    return (
      <>
        {/* mobile menu */}

        {/* actual layout of app */}
        <Layout hasSider>
          <Sider
            collapsedWidth={0}
            // collapsed={isMenuCollapsed}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",

              left: 0,
              top: 0,
              bottom: 0,
            }}
            // className="z-20 custom-sidebar hidden md:block"
          >
            <Menu theme="dark" items={items} />
          </Sider>

          <Layout className="md:pl-44">
            <Content className="px-4 md:px-12 mt-10">
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
