import { Input, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { Form } from "antd";
import {
  emailValidationRules,
  textInputValidationRules,
  textInputValidationRulesOp,
} from "../../formValidation";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { openNotification } from "../../helpers/notifications";
import { ISaveStaffProps } from "../../helpers/staff";
import { useAddSingleStaff } from "../../helpersAPIHooks/staff";
import { useAddSingleCusodian } from "../../helpersAPIHooks/custodians";
import { ISaveCustProps } from "../../helpers/custodians";

interface IProps {
  handleClose: Function;
  studentId: string;
}

const AssignSingleCustodianToStudent = ({ handleClose, studentId }: IProps) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;

  const { mutate, isLoading } = useAddSingleCusodian();
  const handleFinish = (data: any) => {
    if (schoolId) {
      const props: ISaveCustProps = {
        schoolId,
        token,
        email: data.email,
        occupation: data.occupation,
        name: `${data.firstName} ${data.middleName ?? ""} ${data.lastName}`,
        phone: data.phone,
        studentId,
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

          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
          form.resetFields();

          handleClose();

          queryClient.invalidateQueries({
            queryKey: ["custodians"],
            // exact: true,
          });
        },
      });
    }
  };
  return (
    <div>
      {" "}
      <Form
        requiredMark={false}
        labelCol={{ span: 24 }}
        onFinish={handleFinish}
        form={form}
      >
        <Form.Item
          label={`First Name`}
          name="firstName"
          rules={textInputValidationRules}
        >
          <Input placeholder="First name" />
        </Form.Item>
        <Form.Item
          label={`Last Name`}
          name="lastName"
          rules={textInputValidationRules}
        >
          <Input placeholder="Last name" />
        </Form.Item>
        <Form.Item
          label={`Occupation`}
          name="occupation"
          rules={textInputValidationRules}
        >
          <Input placeholder="Last name" />
        </Form.Item>
        <Form.Item
          label={`Middle Name`}
          name="middleName"
          rules={textInputValidationRulesOp}
        >
          <Input placeholder="Middle name" />
        </Form.Item>
        <Form.Item
          label={`Custodian Email`}
          name="email"
          rules={emailValidationRules}
        >
          <Input placeholder="Custodian Email" />
        </Form.Item>
        <Form.Item
          label={`Phone`}
          name="phone"
          rules={textInputValidationRulesOp}
        >
          <Input placeholder="phone" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" className="w-full">
            Assign Student Custodian
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AssignSingleCustodianToStudent;
