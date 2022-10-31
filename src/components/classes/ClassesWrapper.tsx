import { Typography, Button, Drawer, Input } from "antd";
import React, { useState } from "react";
import AddClassForm from "./AddClassForm";
import ClassesTable from "./ClassesTable";

const ClassesWrapper = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Typography.Title level={3}>Classes</Typography.Title>
      <div className=" mt-4 flex justify-end">
        <div className="flex gap-4">
          <Input.Search
            placeholder="Search classes"
            onSearch={(val) => setSearchTerm(val)}
            allowClear
            onChange={(e) => e.target.value === "" && setSearchTerm("")}
          />
          <Button onClick={() => setShowDrawer(true)} type="primary">
            Add Class
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <ClassesTable
          refresh={refresh}
          setRefresh={setRefresh}
          searchTerm={searchTerm}
        />
      </div>

      <Drawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        title="Add Class"
      >
        <AddClassForm
          closeDrawer={() => setShowDrawer(false)}
          setRefresh={setRefresh}
        />
      </Drawer>
    </div>
  );
};

export default ClassesWrapper;
