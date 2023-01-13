import { Tabs } from "antd";
import React from "react";
import Profile from "./singleAdmin/Profile";

interface IProps {
  adminId?: string;
  isUser?: boolean;
}
const SingleAdminWrapper = ({ adminId, isUser }: IProps) => {
  return (
    <div>
      {/* header */}
      {!isUser && <span>Back & Breadcrumbs for admin</span>}
      <br />
      {adminId ? (
        <Tabs>
          <Tabs.TabPane tab="Profile" key="item-1">
            <Profile adminId={adminId} />
          </Tabs.TabPane>

          {/* for admin */}
          <Tabs.TabPane tab="Activities" key="item-3">
            Admin added 20 new staff record, ... etc.
          </Tabs.TabPane>
        </Tabs>
      ) : (
        "admin profile not found"
      )}
    </div>
  );
};

export default SingleAdminWrapper;