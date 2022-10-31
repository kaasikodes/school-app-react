import { Typography, Button, Drawer, Input } from "antd";
import React, { useState } from "react";
import AddDepartmentForm from "./AddDepartmentForm";
import DepartmentsTable from "./DepartmentsTable";

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
        </div>
      </div>
      <div className="mt-8">
        <DepartmentsTable
          refresh={refresh}
          setRefresh={setRefresh}
          searchTerm={searchTerm}
        />
      </div>

      <Drawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        title="Add Department"
      >
        <AddDepartmentForm
          closeDrawer={() => setShowDrawer(false)}
          setRefresh={setRefresh}
        />
      </Drawer>
    </div>
  );
};

export default DepartmentsWrapper;
