import { Typography, Button, Tabs, Drawer } from "antd";
import { useState } from "react";
import { InvitationContainer } from "./InvitationContainer";
import AddInvitation from "./AddInvitation";

export const InvitationWrapper = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div className="flex flex-col justify-between">
      <Typography.Title level={3}>Invite Users</Typography.Title>
      <div className="flex justify-end">
        <Button onClick={() => setShowDrawer(true)} type="primary">
          Invite User(s)
        </Button>
      </div>
      <Tabs>
        <Tabs.TabPane tab="Administrators" key="Administrators">
          <InvitationContainer type="admin" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Staff" key="staff">
          <InvitationContainer type="staff" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Student" key="Student">
          <InvitationContainer type="student" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Custodians" key="Custodians">
          <InvitationContainer type="custodian" />
        </Tabs.TabPane>
      </Tabs>

      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        title="Invite Users"
      >
        <AddInvitation closeDrawer={() => setShowDrawer(false)} />
      </Drawer>
    </div>
  );
};
