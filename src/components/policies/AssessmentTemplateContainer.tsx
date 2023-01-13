import { Button, Drawer } from "antd";
import React, { useState } from "react";
import CourseAssessmentTemplateCards from "./CourseAssessmentTemplateCards";
import CreateCourseAssessmentTemplateForm from "./CreateCourseAssessmentTemplateForm";

const AssessmentTemplateContainer = () => {
  const [showD, setShowD] = useState(false);
  const [assignSessionTemplate, setAssignSessionTemplate] = useState(false);
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
          <Button
            type="ghost"
            onClick={() => setAssignSessionTemplate((val) => !val)}
          >
            {assignSessionTemplate
              ? "Cancel Operation"
              : "Assign Template to Session"}
          </Button>
          {!assignSessionTemplate && (
            <Button type="primary" onClick={() => setShowD(true)}>
              Create New Template
            </Button>
          )}
        </div>
      </div>
      <CourseAssessmentTemplateCards
        assignSessionTemplate={assignSessionTemplate}
        setAssignSessionTemplate={setAssignSessionTemplate}
      />
    </div>
  );
};

export default AssessmentTemplateContainer;
