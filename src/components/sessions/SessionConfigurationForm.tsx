import { Select, Switch, Button, Form } from "antd";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { openNotification } from "../../helpers/notifications";
import {
  useFetchSchoolSessionSetting,
  useFetchSingleSession,
  useSaveSchoolSessSettings,
  useUpdateSchoolsSession,
} from "../../helpersAPIHooks/sessions";
import ComponentLoader from "../loaders/ComponentLoader";
import { useFetchCourseRecordTemplates } from "../../helpersAPIHooks/schoolCRecordTemplates";

const SessionConfigurationForm = () => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const sessionId = globalState?.currentSchool?.currentSessionId as string;
  const { data: templatesData, isSuccess: isTempateSuccess } =
    useFetchCourseRecordTemplates({
      token,
      schoolId,
    });

  const {
    data: schoolSessionSetting,
    isSuccess: isSessSettingSuccess,
    isFetching,
  } = useFetchSchoolSessionSetting({
    sessionId,
    schoolId,
    token,
  });
  useEffect(() => {
    if (isSessSettingSuccess && schoolSessionSetting.courseRecordTemplateId) {
      console.log("DATA", schoolSessionSetting);
      form.setFieldsValue({
        templateId: schoolSessionSetting.courseRecordTemplateId,
      });
    }
  }, [isSessSettingSuccess, schoolSessionSetting, form]);

  const { mutate, isLoading } = useSaveSchoolSessSettings();

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
        templateId: data.templateId,
        gradePolicyId: data.gradePolicyId,
        studentEnrollmentPolicyId: data.studentEnrollmentPolicyId,
      },
      {
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries({
            queryKey: ["school-session-setting", schoolId, sessionId],
            // exact: true,
          });
        },
      }
    );
  };
  if (isFetching || !isSessSettingSuccess || !isTempateSuccess) {
    <ComponentLoader />;
  }
  return (
    <Form
      requiredMark={false}
      labelCol={{ span: 24 }}
      onFinish={handleFinish}
      form={form}
    >
      <Form.Item
        label={`What assessment template will be used ?`}
        name="templateId"
      >
        <Select
          options={templatesData?.map((item) => ({
            value: item.id,
            label: item.title,
          }))}
        />
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
        <Button
          htmlType="submit"
          type="primary"
          className="w-full"
          loading={isLoading}
        >
          Save Configuration
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SessionConfigurationForm;
