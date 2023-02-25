import { Form, Input, Button } from "antd";
import React, { useContext, useState } from "react";
import { openNotification } from "../../helpers/notifications";

import { LoadingOutlined } from "@ant-design/icons";

import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import {
  textInputValidationRules,
  textInputValidationRulesOp,
} from "../../formValidation";
import { useQueryClient } from "react-query";
import { useAddSingleClass } from "../../helpersAPIHooks/classes";
import { ISaveClassProps } from "../../helpers/classes";

interface IProps {
  closeDrawer: Function;
}

// TO DO
// Refactor this to use react query & indicate a loading state on sbmt btn (also disable)

const AddSingleClassForm = ({ closeDrawer }: IProps) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const adminId = globalState?.currentSchool?.adminId as string;

  const { mutate, isLoading } = useAddSingleClass();

  const handleFinish = (data: any) => {
    if (schoolId) {
      const props: ISaveClassProps = {
        schoolId,
        token,
        name: data.name,
        description: data.description,
        // adminId,
      };
      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <LoadingOutlined />,
      });
      mutate(props, {
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
            queryKey: ["classes"],
            // exact: true,
          });
        },
      });
    }
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
          label={`Class name`}
          name="name"
          rules={textInputValidationRules}
        >
          <Input placeholder="Class name" />
        </Form.Item>
        <Form.Item
          label={`Description (optional)`}
          name="description"
          rules={[...textInputValidationRulesOp]}
        >
          <Input.TextArea placeholder="Describe the class" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className="w-full"
            loading={isLoading}
          >
            Add Class
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSingleClassForm;
