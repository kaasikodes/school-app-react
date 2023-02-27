import { Button, Drawer, Input, Typography } from "antd";
import { useState } from "react";

import AddStaff from "./AddStaff";

import StaffViewContainer from "./StaffViewContainer";

const StaffWrapper = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Typography.Title level={3}>Staff</Typography.Title>
      <div className=" mt-4 flex md:justify-end">
        <div className="flex gap-4">
          <Input.Search
            placeholder="Search staff"
            onSearch={(val) => setSearchTerm(val)}
            allowClear
            onChange={(e) => e.target.value === "" && setSearchTerm("")}
          />
          <Button onClick={() => setShowDrawer(true)} type="primary">
            Add Staff
          </Button>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <StaffViewContainer searchTerm={searchTerm} />
      </div>

      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        title="Add Staff"
      >
        <AddStaff closeDrawer={() => setShowDrawer(false)} />
      </Drawer>
    </div>
  );
};

export default StaffWrapper;
