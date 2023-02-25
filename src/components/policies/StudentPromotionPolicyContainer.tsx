import { Button, Drawer } from "antd";
import { useState } from "react";
import StudentPromotionPolicyCards from "./StudentPromotionPolicyCards";
import CreateStudentPromotionPolicyForm from "./CreateStudentPromotionPolicyForm";

const StudentPromotionPolicyContainer = () => {
  const [showD, setShowD] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <Drawer
        title="New Student Promotion Policy"
        open={showD}
        onClose={() => setShowD(false)}
      >
        <CreateStudentPromotionPolicyForm />
      </Drawer>
      <div className="flex justify-end">
        <div className="flex gap-2">
          <Button type="ghost">Assign policy to Session</Button>
          <Button type="primary" onClick={() => setShowD(true)}>
            Create New Policy
          </Button>
        </div>
      </div>
      <StudentPromotionPolicyCards />
    </div>
  );
};

export default StudentPromotionPolicyContainer;
