import { Button, Form, Radio } from "antd";
import React from "react";

export const SelectRegistrationType: React.FC<{
  handleFin: (data: any) => void;
}> = ({ handleFin }) => {
  return (
    <div>
      <Form onFinish={handleFin} layout="vertical">
        <Form.Item
          name="userType"
          label={<h4>Do you want to register as a </h4>}
        >
          <Radio.Group className="w-full ">
            <div className="flex flex-col gap-4">
              {[
                { name: "Administrator", type: "admin" },
                { name: "Staff", type: "staff" },
                { name: "Custodian", type: "custodian" },
                { name: "Student", type: "student" },
              ].map((item) => (
                <div className="px-2 py-2 border rounded-md">
                  <Radio value={item.type}>{item.name}</Radio>
                </div>
              ))}
            </div>
          </Radio.Group>
        </Form.Item>
        <div className="flex justify-end">
          <Button htmlType="submit" type="primary">
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};
