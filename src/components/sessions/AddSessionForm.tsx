import { Form, Input, Button, DatePicker } from "antd";

import { openNotification } from "../../helpers/notifications";

import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { addSchoolSession } from "../../helpers/sessions";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";

interface IProps {
  closeDrawer: Function;
  refresh?: Function;
}

const AddSessionForm = ({ closeDrawer, refresh }: IProps) => {
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
            Add Session
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSessionForm;
