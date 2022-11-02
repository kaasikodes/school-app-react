import { Button, Form, Switch } from "antd";
import React from "react";

const CreateStudentPromotionPolicyForm = () => {
  return (
    <div>
      <div>
        <Form labelCol={{ span: 24 }} initialValues={{}}>
          <Form.Item
            label="Should certain staff have to approve sudents promotion ?"
            name="certainStaff"
          >
            <Switch
              defaultChecked
              checkedChildren={"Yes"}
              unCheckedChildren={"No"}
            />
          </Form.Item>
          <Form.Item
            label="Should class teachers be responsible for approving promotions"
            name="classTeachers"
          >
            <Switch
              defaultChecked
              checkedChildren={"Yes"}
              unCheckedChildren={"No"}
            />
          </Form.Item>
          <Form.Item
            label="Should the admin alone be solely responsible ?"
            name="adminAlone"
          >
            <Switch
              defaultChecked
              checkedChildren={"Yes"}
              unCheckedChildren={"No"}
            />
          </Form.Item>
          <Form.Item label="">
            <Button htmlType="submit">Save Policy</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default CreateStudentPromotionPolicyForm;
