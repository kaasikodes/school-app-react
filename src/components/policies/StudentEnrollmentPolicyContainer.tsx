import { Button, Card, Drawer, Tag, Typography } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import StudentEnrollmentPolicyCards from "./StudentEnrollmentPolicyCards";
import SessionStudentEnrollmentPolicy from "../students/SessionStudentEnrollmentPolicy";
import CreateStudentEnrollmentPolicyForm from "./CreateStudentEnrollmentPolicyForm";

const StudentEnrollmentPolicyContainer = () => {
  const [showD, setShowD] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <Drawer
        title="New Student Enrollment Policy"
        open={showD}
        onClose={() => setShowD(false)}
      >
        <CreateStudentEnrollmentPolicyForm />
      </Drawer>
      <div className="flex justify-end">
        <div className="flex gap-2">
          <Button type="ghost">Assign policy to Session</Button>
          <Button type="primary" onClick={() => setShowD(true)}>
            Create New Policy
          </Button>
        </div>
      </div>
      <StudentEnrollmentPolicyCards />
    </div>
  );
};

export default StudentEnrollmentPolicyContainer;