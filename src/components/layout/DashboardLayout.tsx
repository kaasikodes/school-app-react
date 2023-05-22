import { Layout } from "antd";
import React, { useContext, useState } from "react";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { logoutUser } from "../../helpers/auth";
import axios from "axios";
import { ERole } from "../../appTypes/roles";
import { dashboardSideMenuLinks } from "../../data/dashboard";
import MobileMenu from "./MobileMenu";
import { useNavigate } from "react-router-dom";
import { IAuthDets } from "../../appTypes/auth";
import { useFetchSessions } from "../../helpersAPIHooks/sessions";
import { GlobalContext, TCSchool } from "../../contexts/GlobalContextProvider";
import Sidebar from "./Sidebar";
import TopActions from "./TopActions";

axios.defaults.withCredentials = true;

// TO DO -> START
// Refactor dashboard layout

// TO DO
// Fix collapse dashboard sidebar bug

const { Content } = Layout;

type Props = {
  children: JSX.Element;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;

  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;

  const currentSchool = globalState.currentSchool;

  const token = authDetails.userToken;
  const { data: sessions, isSuccess: isSessSuccess } = useFetchSessions({
    token,
    schoolId: currentSchool?.id as string,
  });
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

  const menuLinks = dashboardSideMenuLinks({
    role: currentSchool?.currentRole ?? ERole.NONE,
  });

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

        {/* actual layout of app */}
        <Layout hasSider>
          <Sidebar
            handleLogout={handleLogout}
            currentSchool={currentSchool as TCSchool}
            links={menuLinks}
            isMenuCollapsed={isMenuCollapsed}
            setIsMenuCollapsed={setIsMenuCollapsed}
          />
          <TopActions
            currentSchool={currentSchool as TCSchool}
            user={user}
            handleLogout={handleLogout}
            sessions={sessions?.data}
            setShowMobileMenu={setShowMobileMenu}
          />

          <Layout
            className={`site-layout   bg-stone-50   ${
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
