import { Input, Button, Form, Spin, Select } from "antd";

import { useMutation } from "react-query";
import { genders } from "../../data";
import { loginUser } from "../../helpers/auth";
import { addEstateOwner, ICreateProps } from "../../helpers/estateOwners";
import { openNotification } from "../utils/notifcations";

const AddEstateOwner = () => {
  const { mutate } = useMutation(addEstateOwner);
  const handleSubmit = async (data: ICreateProps) => {
    openNotification({
      state: "info",
      title: "Wait a minute ...",
      description: <Spin />,
    });
    mutate(
      { ...data },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res) => {
          const result = res.data.data;

          openNotification({
            state: "success",

            title: "Success",
            description: "The estate owner was created successfully",
            // duration: 0.4,
          });
        },
      }
    );
  };
  return (
    <Form labelCol={{ span: 24 }} onFinish={handleSubmit}>
      <Form.Item name={"firstName"}>
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item name={"lastName"}>
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item name={"email"}>
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name={"phoneNumber"}>
        <Input placeholder="Phone Number" />
      </Form.Item>
      <Form.Item name={"gender"}>
        <Select placeholder="Gender">
          {genders.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name={"password"}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item name={"address"}>
        <Input.TextArea placeholder="address" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" className="w-full" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddEstateOwner;
