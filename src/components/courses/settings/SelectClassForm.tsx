import { Form, Typography } from "antd";
import React from "react";
import { FormLevelsInput } from "../../../customFormComponents/FormLevelsInput";

const SelectClassForm: React.FC<{
  handleCurrentClass: (val: number) => void;
}> = ({ handleCurrentClass }) => {
  const [form] = Form.useForm();
  const handleFin = (data: any) => {
    handleCurrentClass(data.classId);
  };
  return (
    <div className="w-full flex flex-col gap-4 items-stretch">
      <Typography.Title level={5}>
        Select the class for which you would like to assign course teachers
      </Typography.Title>
      <div className=" flex w-full">
        <Form
          form={form}
          onFinish={handleFin}
          requiredMark={false}
          layout="vertical"
        >
          <FormLevelsInput Form={Form} />
        </Form>
      </div>
    </div>
  );
};

export default SelectClassForm;
