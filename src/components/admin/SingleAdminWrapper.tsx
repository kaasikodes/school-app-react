import { Tabs } from "antd";
import AdminActivities from "./singleAdmin/AdminActivities";
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
            <AdminActivities />
          </Tabs.TabPane>
        </Tabs>
      ) : (
        "admin profile not found"
      )}
    </div>
  );
};

export default SingleAdminWrapper;
