import { Button, Drawer } from "antd";
import React, { useState } from "react";
import CourseEnrollmentPolicyCards from "./CourseEnrollmentPolicyCards";
import CreateCourseEnrollmentPolicyForm from "./CreateCourseEnrollmentPolicyForm";

const CourseEnrollmentPolicyContainer = () => {
  const [showD, setShowD] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <Drawer
        title="New Student Enrollment Policy"
        open={showD}
        onClose={() => setShowD(false)}
      >
        <CreateCourseEnrollmentPolicyForm />
      </Drawer>
      <div className="flex justify-end">
        <div className="flex gap-2">
          <Button type="ghost">Assign policy to Session</Button>
          <Button type="primary" onClick={() => setShowD(true)}>
            Create New Policy
          </Button>
        </div>
      </div>
      <CourseEnrollmentPolicyCards />
    </div>
  );
};

export default CourseEnrollmentPolicyContainer;
