import { Form, Input, Button, DatePicker, Tabs, Switch, Select } from "antd";
import React, { useState } from "react";

import { openNotification } from "../../helpers/notifications";
import { saveSchool } from "../../helpers/schools";

import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { addSchoolSession } from "../../helpers/sessions";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";

interface IProps {
  closeDrawer: Function;
  refresh?: Function;
}

const SetUpCurrentSessionForm = ({ closeDrawer, refresh }: IProps) => {
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

    addSchoolSession({
      name: data.name,
      description: data.description,
      schoolId: schoolId as string,
      token,
      starts: data.starts.format("YYYY-MM-DD"),
    })
      .then((res: any) => {
        const result = res.data;
        console.log(result, "res");

        openNotification({
          state: "success",
          title: "Success",
          description: `${result.message} `,
        });
        refresh && refresh();

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
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Details" key={"single"}>
          <Form
            requiredMark={false}
            labelCol={{ span: 24 }}
            onFinish={handleFinish}
          >
            <Form.Item label={`Session name`} name="name">
              <Input placeholder="Session name" required />
            </Form.Item>
            <Form.Item label={`Description (optional)`} name="description">
              <Input.TextArea placeholder="Describe the school" rows={4} />
            </Form.Item>
            <Form.Item label={`Starts`} name="starts">
              <DatePicker
                className="w-full"
                disabledDate={(d) =>
                  !d ||
                  d.isAfter("2042-12-31") ||
                  d.isSameOrBefore(
                    moment(new Date().toLocaleDateString()).format("YYYY-MM-DD")
                  )
                }
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" className="w-full">
                Save Details
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Configuration" key={"bulk"}>
          <Form
            requiredMark={false}
            labelCol={{ span: 24 }}
            onFinish={handleFinish}
          >
            <Form.Item
              label={`What assessment template will be used ?`}
              name="assessmentTemplateId"
            >
              <Select />
            </Form.Item>
            <Form.Item
              label={`Can custodians view result of current ongoing session without approval ?`}
              name="approvalForResult"
            >
              <Switch unCheckedChildren="No" checkedChildren="Yes" />
            </Form.Item>
            <Form.Item
              label={`Do class teachers need to approve all course assesments before compilation ?`}
              name="isClassTeacherNeeded"
            >
              <Switch unCheckedChildren="No" checkedChildren="Yes" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary" className="w-full">
                Save Configuration
              </Button>
            </Form.Item>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default SetUpCurrentSessionForm;
