import { Typography, Button, Drawer, Input } from "antd";
import { useState } from "react";
import AddClass from "./AddClass";
import ClassesViewContainer from "./ClassesViewContainer";

const ClassesWrapper = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Typography.Title level={3}>School Classes</Typography.Title>
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
        <ClassesViewContainer searchTerm={searchTerm} />
      </div>

      <Drawer
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        title="Add Class"
      >
        <AddClass closeDrawer={() => setShowDrawer(false)} />
      </Drawer>
    </div>
  );
};

export default ClassesWrapper;
