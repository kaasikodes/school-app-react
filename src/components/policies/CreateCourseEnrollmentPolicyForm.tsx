import { Button, Form, Switch } from "antd";

const CreateCourseEnrollmentPolicyForm = () => {
  return (
    <div>
      {/* <p>
      Student will be approved by coursePrimary Teacher before participating
      in course
    </p>
    <p>
      Student will be approved by coursePrimary Teacher and classTeacher
      before participating in course
    </p>
    <p>Student must have parent approve b4 participating in course</p> */}
      <div>
        <Form labelCol={{ span: 24 }} initialValues={{}}>
          <Form.Item
            label="Student will be approved by course primary teacher before participating in course alone?"
            name="coursePrimaryTeacherMustApprove"
          >
            <Switch
              defaultChecked
              checkedChildren={"Yes"}
              unCheckedChildren={"No"}
            />
          </Form.Item>
          <Form.Item
            label="Student will be approved by coursePrimary Teacher and classTeacher before participating in course?"
            name="CoursePrimaryTeacherAndClassTeacherMustApprove"
          >
            <Switch
              defaultChecked
              checkedChildren={"Yes"}
              unCheckedChildren={"No"}
            />
          </Form.Item>
          <Form.Item
            label="Student must have parent's consent before participating in course ?"
            name="haveParentConsent"
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

export default CreateCourseEnrollmentPolicyForm;
