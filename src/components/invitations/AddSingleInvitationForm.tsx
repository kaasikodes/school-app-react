import { Form, Input, Button, Select } from "antd";
import { openNotification } from "../../helpers/notifications";

import {
  emailValidationRules,
  generalValidationRules,
} from "../../formValidation";
import { useQueryClient } from "react-query";
import useCreateSingleInvitation from "../../helpersAPIHooks/invites/useCreateSingleInvitation";

interface IProps {
  closeDrawer: Function;
}

// TO DO
// Refactor this to use react query & indicate a loading state on sbmt btn (also disable)

export const AddSingleInvitationForm = ({ closeDrawer }: IProps) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  const { mutate, isLoading } = useCreateSingleInvitation();

  const handleFinish = (data: any) => {
    mutate(
      {
        userType: data.userType,
        email: data.userEmail,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          // const result = res.data.data;
          console.log("BULK", res);

          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
          form.resetFields();

          closeDrawer();

          queryClient.invalidateQueries({
            queryKey: ["invites"],
            // exact: true,
          });
        },
      }
    );
  };

  return (
    <div>
      <Form
        requiredMark={false}
        labelCol={{ span: 24 }}
        onFinish={handleFinish}
        form={form}
      >
        <Form.Item
          label={`User Email`}
          name="userEmail"
          rules={emailValidationRules}
        >
          <Input placeholder="User Email" />
        </Form.Item>
        <Form.Item
          label={`Type of User`}
          name="userType"
          rules={generalValidationRules}
        >
          <Select
            options={[
              { label: "Student", value: "student" },
              { label: "Custodian", value: "custodian" },
              { label: "Staff", value: "staff" },
              {
                label: "Admin",
                value: "admin",
                //  disabled: true
              },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className="w-full"
            loading={isLoading}
          >
            Invite User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
