import { Button, Drawer } from "antd";
import { useState } from "react";
import StudentEnrollmentPolicyCards from "./StudentEnrollmentPolicyCards";
import CreateStudentEnrollmentPolicyForm from "./CreateStudentEnrollmentPolicyForm";

const StudentEnrollmentPolicyContainer = () => {
  const [showD, setShowD] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <Drawer
        title="Student Enrollment Policy"
        open={showD}
        onClose={() => setShowD(false)}
      >
        <CreateStudentEnrollmentPolicyForm />
      </Drawer>
      <div className="flex justify-end">
        <div className="flex gap-2">
          <Button type="ghost">Assign policy to Session</Button>
          <Button type="primary" onClick={() => setShowD(true)}>
            Create Student Policy
          </Button>
        </div>
      </div>
      <StudentEnrollmentPolicyCards />
    </div>
  );
};

export default StudentEnrollmentPolicyContainer;
