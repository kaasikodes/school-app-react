import { Form, Input, Button, Typography, message, Upload } from "antd";
import React, { useContext, useState } from "react";

import { openNotification } from "../../helpers/notifications";
import { ISaveStaffProps } from "../../helpers/staff";
import { LoadingOutlined } from "@ant-design/icons";
import { useQueryClient } from "react-query";
import { RcFile } from "antd/es/upload/interface";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useAddSingleStaff } from "../../helpersAPIHooks/staff";
import {
  emailValidationRules,
  passwordValidationRules,
  textInputValidationRules,
  textInputValidationRulesOp,
} from "../../formValidation";

interface IProps {
  closeDrawer: Function;
}

const AddStaffForm = ({ closeDrawer }: IProps) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const adminId = globalState?.currentSchool?.adminId as string;

  const { mutate, isLoading } = useAddSingleStaff();
  const handleFinish = (data: any) => {
    if (schoolId) {
      const props: ISaveStaffProps = {
        schoolId,
        token,
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.middleName} ${data.lastName}`,
        staffNo: data.staffNo,
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
            queryKey: ["staff"],
            // exact: true,
          });
        },
      });
    }
  };

  const [fileList, setFilelist] = useState<any>([]);

  const handleUpload = (val: any) => {
    setFilelist(val.fileList);
  };
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return false;
  };
  return (
    <div>
      <Form
        requiredMark={false}
        labelCol={{ span: 24 }}
        onFinish={handleFinish}
        form={form}
      >
        <div className="flex flex-col gap-2 mb-4">
          <Typography.Text>
            {fileList.length !== 1
              ? "Profile Photo (optional):"
              : "Profile image has been inserted"}
          </Typography.Text>

          <Upload
            listType="picture"
            fileList={fileList}
            className="avatar-uploader"
            onChange={handleUpload}
            onRemove={(file) => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              setFilelist(newFileList);
            }}
            beforeUpload={beforeUpload} // return false so that antd doesn't upload the picture right away
          >
            {fileList.length !== 1 && (
              <Button type="dashed">Upload profile image</Button>
            )}
          </Upload>
        </div>
        <Form.Item
          label={`Staff No`}
          name="staffNo"
          rules={textInputValidationRules}
        >
          <Input placeholder="Staff no" />
        </Form.Item>
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
          label={`Middle Name`}
          name="middleName"
          rules={textInputValidationRulesOp}
        >
          <Input placeholder="Middle name" />
        </Form.Item>
        <Form.Item
          label={`Staff Email`}
          name="email"
          rules={emailValidationRules}
        >
          <Input placeholder="Staff Email" />
        </Form.Item>
        <Form.Item
          label={`Staff Password`}
          name="password"
          rules={passwordValidationRules}
        >
          <Input placeholder="Staff Password" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" className="w-full">
            Add Staff
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddStaffForm;
