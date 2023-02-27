import { Button, Drawer } from "antd";

import { useState } from "react";

import CreateGradingPolicyForm from "./CreateGradingPolicyForm";
import GradingPolicyCards from "./GradingPolicyCards";

const GradingPolicyContainer = () => {
  const [showD, setShowD] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <Drawer
        title="New Grading Policy"
        open={showD}
        onClose={() => setShowD(false)}
      >
        <CreateGradingPolicyForm />
      </Drawer>
      <div className="flex justify-end">
        <div className="flex gap-2">
          <Button type="ghost">Assign policy to Session</Button>
          <Button type="primary" onClick={() => setShowD(true)}>
            Create New Grading Policy
          </Button>
        </div>
      </div>
      <GradingPolicyCards />
    </div>
  );
};

export default GradingPolicyContainer;
