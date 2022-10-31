import { Button, Drawer, Tabs, Typography } from "antd";
import React, { useState } from "react";
import EnrollStudentForm from "./EnrollStudentForm";
import StudentsTable from "./StudentsTable";

const StudentsWrapper = () => {
  const [showD, setShowD] = useState(false);
  return (
    <>
      <Drawer
        visible={showD}
        title={`Enroll Student`}
        onClose={() => setShowD(false)}
        size="large"
      >
        <Tabs>
          <Tabs.TabPane tab="Single Student" key="item-1">
            <EnrollStudentForm />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Bulk Upload" key="item-2">
            Bulk Upload of Students
          </Tabs.TabPane>
        </Tabs>
      </Drawer>
      <div className="flex flex-col gap-4">
        <Typography.Title level={3}>Students</Typography.Title>

        <div className="flex justify-end ">
          <Button type="primary" onClick={() => setShowD(true)}>
            Enroll Student
          </Button>
        </div>
        <StudentsTable />
      </div>
    </>
  );
};
export default StudentsWrapper;
