import { Form, Typography } from "antd";
import React from "react";
import { FormStaffInput } from "../../../customFormComponents/FormStaffInput";

export const AssignStaffAsSessionTeacher: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div className="w-full flex flex-col gap-4">
      <Typography.Title level={5}>
        Assign teachers to the courses taught in
      </Typography.Title>
      <Form form={form}>
        {["Physics", "Chemistry", "Geography"].map((item) => (
          <FormStaffInput
            Form={Form}
            control={{ label: item, name: item }}
            key={item}
          />
        ))}
      </Form>
    </div>
  );
};
