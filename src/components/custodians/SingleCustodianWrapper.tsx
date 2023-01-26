import { Typography, Tabs } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import Profile from "./singleCustodian/Profile";
import { ArrowLeftOutlined } from "@ant-design/icons";

interface IProps {
  custodianId?: string;
  isUser?: boolean;
}
const SingleCustodianWrapper = ({ custodianId, isUser }: IProps) => {
  return (
    <div>
      {/* header */}
      <div className="flex justify-end">
        {!isUser && (
          <div className="flex gap-3 items-center">
            <Link to={routes.staff} className="relative bottom-2">
              <ArrowLeftOutlined />
            </Link>
            <Typography.Title level={4}>
              <span className="mb-0 text-slate-500">Custodian Profile</span>
            </Typography.Title>
          </div>
        )}
      </div>

      {custodianId ? (
        <Tabs>
          <Tabs.TabPane tab="Profile" key="item-1">
            <Profile custodianId={custodianId} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Classes" key="item-2"></Tabs.TabPane>

          {/* for admin */}
          <Tabs.TabPane tab="Activities" key="item-3"></Tabs.TabPane>
        </Tabs>
      ) : (
        "custodian profile not found"
      )}
    </div>
  );
};

export default SingleCustodianWrapper;
