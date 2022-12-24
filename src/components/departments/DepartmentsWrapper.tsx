import { Typography, Button, Drawer, Input } from "antd";
import React, { useState } from "react";
import AddDepartment from "./AddDepartment";
import { DownloadOutlined } from "@ant-design/icons";

import DepartmentsViewContainer from "./DepartmentsViewContainer";

const DepartmentsWrapper = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Typography.Title level={3}>Departments</Typography.Title>
      <div className=" mt-4 flex md:justify-end">
        <div className="flex gap-4">
          <Input.Search
            placeholder="Search departments"
            onSearch={(val) => setSearchTerm(val)}
            allowClear
            onChange={(e) => e.target.value === "" && setSearchTerm("")}
          />

          <Button onClick={() => setShowDrawer(true)} type="primary">
            Add Department
          </Button>
          {/* To Do -> download of departments & format from backend */}
          <Button
            type="text"
            icon={<DownloadOutlined />}
            title={`Download departments`}
          />
        </div>
      </div>
      <div className="mt-8">
        <DepartmentsViewContainer searchTerm={searchTerm} />
      </div>

      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        title="Add Department"
      >
        <AddDepartment closeDrawer={() => setShowDrawer(false)} />
      </Drawer>
    </div>
  );
};

export default DepartmentsWrapper;
