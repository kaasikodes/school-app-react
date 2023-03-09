import { Button, Drawer, Typography } from "antd";
import React, { useState } from "react";
import AddStudent from "./AddStudent";
import StudentsTable from "./StudentsTable";

const StudentsWrapper = () => {
  const [showD, setShowD] = useState(false);
  return (
    <>
      <Drawer
        open={showD}
        title={`Enroll New Student`}
        onClose={() => setShowD(false)}
        width={800}
        // size="large"
      >
        <AddStudent closeDrawer={() => setShowD(false)} />
        {/* <Tabs>
          <Tabs.TabPane tab="Single Student" key="item-1">
            <EnrollStudentForm />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Bulk Upload" key="item-2">
            Bulk Upload of Students
          </Tabs.TabPane>
        </Tabs> */}
      </Drawer>
      <div className="flex flex-col gap-4">
        <Typography.Title level={3}>Students</Typography.Title>
        {/* name, email, phone, id_number, current_level_id, current_sess_id */}
        {/* name, email, phone,  => custodian_id */}
        {/* student session payments -> session_id, amount_paid balance total_due */}

        <div className="flex justify-end ">
          <Button type="primary" onClick={() => setShowD(true)}>
            Enroll new Student
          </Button>
        </div>
        <StudentsTable />
      </div>
    </>
  );
};
export default StudentsWrapper;
