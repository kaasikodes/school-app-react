import { Input, DatePicker, Button, Form } from "antd";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { openNotification } from "../../helpers/notifications";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import {
  useFetchSingleSession,
  useUpdateSchoolsSession,
} from "../../helpersAPIHooks/sessions";
import ComponentLoader from "../loaders/ComponentLoader";
import { useQueryClient } from "react-query";

const SessionDetailsForm = () => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const sessionId = globalState?.currentSchool?.currentSessionId as string;
  const {
    data: session,
    isSuccess,
    isFetching,
  } = useFetchSingleSession({
    token,
    sessionId,
  });

  useEffect(() => {
    if (isSuccess) {
      form.setFieldsValue({
        name: session.name,
        description: session.description,
        starts: session.starts ? moment(session.starts) : null,
      });
    }
  }, [isSuccess, form, session]);

  const { mutate, isLoading } = useUpdateSchoolsSession();

  const handleFinish = (data: any) => {
    openNotification({
      state: "info",
      title: "Wait a minute",
      description: <LoadingOutlined />,
    });

    mutate(
      {
        schoolId,
        token,
        sessionId,
        name: data.name,
        description: data.description,
        starts: data?.starts?.format("YYYY/MM/DD"),
      },
      {
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries({
            queryKey: ["single-session", sessionId],
            // exact: true,
          });
        },
      }
    );
  };
  if (isFetching || !isSuccess) {
    <ComponentLoader />;
  }
  return (
    <Form
      requiredMark={false}
      labelCol={{ span: 24 }}
      onFinish={handleFinish}
      form={form}
    >
      <Form.Item label={`Session name`} name="name">
        <Input placeholder="Session name" required />
      </Form.Item>
      <Form.Item label={`Description (optional)`} name="description">
        <Input.TextArea placeholder="Describe the school" rows={4} />
      </Form.Item>
      <Form.Item label={`Starts`} name="starts">
        <DatePicker
          disabled
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
        <Button
          htmlType="submit"
          type="primary"
          className="w-full"
          loading={isLoading}
        >
          Save Details
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SessionDetailsForm;
