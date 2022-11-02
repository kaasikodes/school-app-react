import { Button, Drawer } from "antd";
import React, { useState } from "react";
import CourseAssessmentTemplateCards from "./CourseAssessmentTemplateCards";
import CreateCourseAssessmentTemplateForm from "./CreateCourseAssessmentTemplateForm";

const AssessmentTemplateContainer = () => {
  const [showD, setShowD] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <Drawer
        title="New Course Assessment Template"
        open={showD}
        onClose={() => setShowD(false)}
      >
        <CreateCourseAssessmentTemplateForm
          handleClose={() => setShowD(false)}
        />
      </Drawer>
      <div className="flex justify-end">
        <div className="flex gap-2">
          <Button type="ghost">Assign policy to Session</Button>
          <Button type="primary" onClick={() => setShowD(true)}>
            Create New Template
          </Button>
        </div>
      </div>
      <CourseAssessmentTemplateCards />
    </div>
  );
};

export default AssessmentTemplateContainer;
