import { Form, Input, Button, Typography, message, Upload } from "antd";
import React, { useState } from "react";

import { openNotification } from "../../helpers/notifications";
import { saveSchoolStaff } from "../../helpers/staff";
import { LoadingOutlined } from "@ant-design/icons";
import { useQueryClient } from "react-query";
import { RcFile } from "antd/es/upload/interface";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";

interface IProps {
  closeDrawer: Function;
}

const EditStaffForm = ({ closeDrawer }: IProps) => {
  const queryClient = useQueryClient();

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const handleFinish = (data: any) => {
    openNotification({
      state: "info",
      title: "Wait a minute",
      description: <LoadingOutlined />,
    });

    saveSchoolStaff({
      staffNo: data.staffNo,
      schoolId: schoolId as string,
      token,
      email: data.email,
      password: data.password,
      name: data.name,
    })
      .then((res: any) => {
        const result = res.data;
        console.log(result, "res");
        queryClient.invalidateQueries("staff");

        openNotification({
          state: "success",
          title: "Success",
          description: `${
            result.message ?? data.name + " was created successfully."
          } `,
        });

        closeDrawer();
      })
      .catch((err: any) => {
        console.log(err);
        openNotification({
          state: "error",
          title: "Error occures",
          description: `${data.name} school was not created!`,
        });
      });
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

  // useEffect dep id for form.setFieldvalues
  return (
    <div>
      <Form
        requiredMark={false}
        labelCol={{ span: 24 }}
        onFinish={handleFinish}
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
        <Form.Item label={`Staff No`} name="staffNo">
          <Input placeholder="Staff no" required />
        </Form.Item>
        <Form.Item label={`First Name`} name="firstName">
          <Input placeholder="First name" required />
        </Form.Item>
        <Form.Item label={`Last Name`} name="lastName">
          <Input placeholder="Last name" required />
        </Form.Item>
        <Form.Item label={`Staff Email`} name="email">
          <Input placeholder="Staff Email" required />
        </Form.Item>
        <Form.Item label={`Staff Password`} name="password">
          <Input placeholder="Staff Password" required />
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

export default EditStaffForm;
