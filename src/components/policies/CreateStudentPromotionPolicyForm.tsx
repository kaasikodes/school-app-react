import { Button, Form, Switch } from "antd";
import React from "react";

const CreateStudentPromotionPolicyForm = () => {
  return (
    <div>
      {/* <p>General Policy | Policy for each class </p>
      <p>
        Student must pass selected course (only course that are applied to all
        classes will be shown) #general mode{" "}
      </p>
      <p>
        Before entering class student must pass external exam(show list of
        external exams)
      </p> */}

      <div>
        <Form labelCol={{ span: 24 }} initialValues={{}}>
          <Form.Item
            label="Should certain staff have to approve sudents promotion (Allow for
              filtering of students with scores above, ...)"
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
