import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";

const Root = () => {
  return (
    <DashboardLayout>
      <>
        <Outlet />
      </>
    </DashboardLayout>
  );
};

export default Root;
