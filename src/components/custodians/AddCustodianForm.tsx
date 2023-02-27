import { Button, Form, Input } from "antd";

import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";

const EnrollStudentForm = () => {
  // const auth = useAuthUser();

  // const authDetails = auth() as unknown as IAuthDets;

  // const user = authDetails.user;
  // const token = authDetails.userToken;
  // const schoolId = authDetails.choosenSchoolId;
  const [form] = Form.useForm();

  const handleSubmit = (data: any) => {
    console.log("Data ", data);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Form labelCol={{ span: 24 }} form={form} onFinish={handleSubmit}>
          <Form.Item label="First Name" name="firstName">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName">
            <Input />
          </Form.Item>
          <Form.Item label="Middle Name" name="middleName">
            <Input />
          </Form.Item>
          <Form.Item label="email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="">
            <Button htmlType="submit" type="primary">
              Enroll Student
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EnrollStudentForm;
