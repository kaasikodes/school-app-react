import { Form, Input, Button, DatePicker } from "antd";
import { useEffect, useState } from "react";

import { openNotification } from "../../../helpers/notifications";

import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { getSession, updateSchoolSession } from "../../../helpers/sessions";
import { ISessionEntry } from "./SessionsTable";
import ComponentLoader from "../../loaders/ComponentLoader";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../../appTypes/auth";

interface IProps {
  closeDrawer: Function;
  setRefresh: Function;
  id: string;
}

const EditSessionForm = ({ closeDrawer, setRefresh, id }: IProps) => {
  const [session, setSession] = useState<ISessionEntry | null>(null);
  const [fetching, setFetching] = useState(false);
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

    updateSchoolSession({
      name: data.name,
      description: data.description,
      sessionId: id as string,
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
          description: `${result.message}`,
        });
        setRefresh((val: boolean) => !val);

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

  // pheripherals
  useEffect(() => {
    // const token = localStorage.getItem(LOCAL_USER_TOKEN_KEY);
    console.log(token);
    setFetching(true);
    if (schoolId)
      getSession({ token, sessionId: id })
        .then((res: any) => {
          const result = res.data.data;
          console.log(result, "sess");
          const fSession: ISessionEntry = {
            id: result.id,
            name: result.name,
            starts: result.starts,
            ends: result.ends,
            description: result.description,
            duration: `${result.starts} - ${result.ends ? result.ends : ""}`,
            levelCount: 0,
            courseCount: 0,
            parentCount: 0,
            studentCount: 0,
            staffCount: 0,
          };

          setSession(fSession);
          setFetching(false);
        })
        .catch((err: any) => {
          console.log(err);
        });
  }, [token, id]);
  return (
    <div>
      {fetching ? (
        <ComponentLoader />
      ) : (
        <Form
          requiredMark={false}
          labelCol={{ span: 24 }}
          onFinish={handleFinish}
          initialValues={{
            name: session?.name,
            description: session?.description,
            starts: moment(session?.starts, "YYYY-MM-DD"),
          }}
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
              Update Session
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditSessionForm;
