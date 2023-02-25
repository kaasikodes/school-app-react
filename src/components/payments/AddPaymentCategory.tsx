import { Button, Form, Input, Spin } from "antd";

import { useAuthUser } from "react-auth-kit";
import { useMutation } from "react-query";
import { IAuthDets } from "../../appTypes/auth";
import { textInputValidationRules } from "../../formValidation";
import { openNotification } from "../../helpers/notifications";
import {
  createPaymentCategory,
  ICreatePaymentCatProps,
} from "../../helpers/payments";

const AddPaymentCategory = () => {
  const [form] = Form.useForm();

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const { mutate, isLoading } = useMutation(createPaymentCategory);

  const handleSubmit = (data: any) => {
    console.log(data, "pop");
    if (schoolId) {
      const props: ICreatePaymentCatProps = {
        name: data.name,
        description: data.description,
        token,
        schoolId,
      };
      openNotification({
        state: "info",
        title: "Wait a second ...",
        // description: <Progress percent={80} status="active" />,
        description: <Spin />,
      });
      mutate(props, {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          const result = res.data.data;
          console.log("company", result);

          openNotification({
            state: "success",

            title: "Success",
            description: "Payment Category Created!",
            // duration: 0.4,
          });

          form.resetFields();
        },
      });
    }
  };

  return (
    <Form
      labelCol={{ span: 24 }}
      requiredMark={false}
      onFinish={handleSubmit}
      form={form}
    >
      <Form.Item name="name" label="Name" rules={textInputValidationRules}>
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item name="description" label="Description(optional)">
        <Input.TextArea placeholder="Description" rows={7} />
      </Form.Item>
      <div className="flex justify-end">
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default AddPaymentCategory;
