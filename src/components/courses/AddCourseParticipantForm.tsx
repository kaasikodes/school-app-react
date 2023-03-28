import { useContext, useState } from "react";
import { Button, Form, Select, Spin } from "antd";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { generalValidationRules } from "../../formValidation";
import { useAddSessionCourseParticipantHook } from "../../helpersAPIHooks/courses";
import { useFetchAllStudents } from "../../helpersAPIHooks/students";
import { IASCParticipant } from "../../helpers/courses";
import { openNotification } from "../../helpers/notifications";
import { useQueryClient } from "react-query";

interface IProps {
  courseId?: string;
  levelId?: string;
  closeModal: () => void;
}

const AddCourseParticipantForm = ({
  courseId = "",
  levelId = "",
  closeModal,
}: IProps) => {
  const auth = useAuthUser();
  const queryClient = useQueryClient();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const sessionId = globalState?.currentSchool?.currentSessionId as string;
  const [hint, setHint] = useState("");
  const { data: students, isSuccess } = useFetchAllStudents({
    schoolId,
    token,
    searchTerm: hint,
  });
  const [form] = Form.useForm();
  const { mutate } = useAddSessionCourseParticipantHook();

  const handleSubmit = (data: any) => {
    const studentId = data.studentId;
    if (sessionId && studentId && schoolId) {
      const props: IASCParticipant = {
        sessionId,
        token,
        studentId,
        courses: [
          {
            courseId,
            levelId,
          },
        ],
        schoolId,
      };
      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        // description: <Progress percent={80} status="active" />,
        description: <Spin />,
      });
      mutate(props, {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
          queryClient.invalidateQueries({
            queryKey: ["course-participants"],
          });

          form.resetFields();
          closeModal();
        },
      });
    }
  };

  return (
    <div>
      <Form
        labelCol={{ span: 24 }}
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Select a student to add to course."
          name="studentId"
          rules={generalValidationRules}
        >
          <Select
            options={students?.data.map((item) => ({
              label: `${item.name}(${item.studentNo})`,
              value: item.id,
            }))}
            onSearch={(val) => setHint(val)}
            showSearch
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            notFoundContent={null}
          >
            {isSuccess ? (
              students.data.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}{" "}
                </Select.Option>
              ))
            ) : (
              <div className="flex justify-center items-center w-full">
                <Spin size="small" />{" "}
              </div>
            )}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add Participant
        </Button>
      </Form>
    </div>
  );
};

export default AddCourseParticipantForm;
