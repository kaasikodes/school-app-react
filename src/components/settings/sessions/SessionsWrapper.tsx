import { Typography, Button, Drawer, Input, Breadcrumb } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddSessionForm from "./AddSessionForm";
import SessionsTable from "./SessionsTable";

const SessionsWrapper = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <div className="flex flex-col justify-between">
        <Typography.Title level={3}>Settings</Typography.Title>

        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/settings">Settings</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/settings/sessions">Sessions</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className=" mt-4 flex justify-end">
        <div className="flex gap-4">
          <Input.Search
            placeholder="Search sessions"
            onSearch={(val) => setSearchTerm(val)}
            allowClear
            onChange={(e) => e.target.value === "" && setSearchTerm("")}
          />
          <Button onClick={() => setShowDrawer(true)} type="primary">
            Add Session
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <SessionsTable
          refresh={refresh}
          setRefresh={setRefresh}
          searchTerm={searchTerm}
        />
      </div>

      <Drawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        title="Add Session"
      >
        <AddSessionForm
          closeDrawer={() => setShowDrawer(false)}
          setRefresh={setRefresh}
        />
      </Drawer>
    </div>
  );
};

export default SessionsWrapper;
