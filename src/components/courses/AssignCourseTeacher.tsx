import { Form, Select, Spin, Button } from "antd";
import { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { IAStaffTHSCourse } from "../../helpers/courses";
import { LoadingOutlined } from "@ant-design/icons";
import {
  useAssignStaffToHandleSessionCourse,
  useFetchSingleCourse,
} from "../../helpersAPIHooks/courses";
import { useFetchAllStaff } from "../../helpersAPIHooks/staff";
import ErrorComponent from "../errors/ErrorComponent";
import ComponentLoader from "../loaders/ComponentLoader";
import { useQueryClient } from "react-query";
import { openNotification } from "../../helpers/notifications";
import { generalValidationRules } from "../../formValidation";

interface IProps {
  closeDrawer: Function;

  id: string;
}

const AssignCourseTeacher = ({ closeDrawer, id }: IProps) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const sessionId = globalState?.currentSchool?.currentSessionId as string;
  const [staffHint, setStaffHint] = useState<string | undefined>();
  const {
    data: staffData,
    isSuccess: isStSucess,
    isError: isStError,
  } = useFetchAllStaff({
    schoolId,
    token,

    searchParams: {
      name: staffHint,
    },
  });
  const {
    data: courseData,
    isSuccess: isCSucess,
    isError: isCError,
  } = useFetchSingleCourse({
    id,
    schoolId,
    token,
  });
  const { mutate, isLoading } = useAssignStaffToHandleSessionCourse();

  const handleFinish = (data: any) => {
    if (schoolId) {
      const props: IAStaffTHSCourse = {
        schoolId,
        token,
        levelIds: data.levelIds,
        staffIds: data.staffIds,
        courseId: id,
        sessionId,
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
            queryKey: ["courses"],
            // exact: true,
          });
        },
      });
    }
  };

  if (!isCSucess) {
    return <ComponentLoader />;
  }
  if (isStError) {
    return <ErrorComponent message="Error fetching Staff" />;
  }
  if (isCError) {
    return <ErrorComponent message="Error fetching Course" />;
  }
  return (
    <div className="flex flex-col gap-4">
      <h4 className=" text-sky-600 uppercase underline">{courseData?.name}</h4>
      <Form
        requiredMark={false}
        labelCol={{ span: 24 }}
        onFinish={handleFinish}
        form={form}
      >
        <Form.Item
          label={`Staff`}
          name="staffIds"
          rules={generalValidationRules}
        >
          <Select
            mode="multiple"
            onSearch={(val) => setStaffHint(val)}
            showSearch
            value={staffHint}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            // onChange={handleChange}
            notFoundContent={null}
          >
            {/* TO DO
            Convert all select to api searchable dropdowns */}
            {isStSucess ? (
              staffData.data.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}({item.staffNo})
                </Select.Option>
              ))
            ) : (
              <div className="flex justify-center items-center w-full">
                <Spin size="small" />
              </div>
            )}
          </Select>
        </Form.Item>
        <Form.Item
          label={`What class(es) are the selected staff teaching ? `}
          name="levelIds"
          rules={generalValidationRules}
        >
          <Select mode="multiple">
            {courseData?.levels?.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className="w-full"
            loading={isLoading}
          >
            Assign Course Teacher
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AssignCourseTeacher;
