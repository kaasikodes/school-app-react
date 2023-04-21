import { Button, message, Steps } from "antd";
import { useState } from "react";
import { AssignStaffToCourseResult } from "./AssignStaffToCourseResult";
import SelectClassForm from "./SelectClassForm";
import { SelectTeacherForCourses } from "./SelectTeacherForCourses";

const { Step } = Steps;

const AssignStaffToCourse = () => {
  const [currentClass, setCurrentClass] = useState<number>();
  const handleCurrentClass = (val: number) => {
    setCurrentClass(val);
  };

  const steps = [
    {
      title: "Select Course",
      content: <SelectClassForm handleCurrentClass={handleCurrentClass} />,
    },
    {
      title: "Assign teachers to courses",
      content: currentClass ? (
        <SelectTeacherForCourses classId={currentClass} />
      ) : null,
    },
    {
      title: "Confirm Selection",
      content: currentClass ? (
        <AssignStaffToCourseResult classId={currentClass} />
      ) : null,
    },
  ];

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <div>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="w-full min-h-32 p-4 m-2 mt-6">
        {steps[current].content}
      </div>
      <div className="flex justify-end">
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignStaffToCourse;
