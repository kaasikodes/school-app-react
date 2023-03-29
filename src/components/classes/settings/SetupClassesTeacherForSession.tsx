import { Form, Button, Typography, Select, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../../appTypes/auth";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";
import { generalValidationRules } from "../../../formValidation";
import { IAStaffTHSClass } from "../../../helpers/courses";
import { openNotification } from "../../../helpers/notifications";
import {
  useFetchClasses,
  useFetchClassTeacherRecordsPerSession,
} from "../../../helpersAPIHooks/classes";
import { useAssignStaffToHandleSessionClasses } from "../../../helpersAPIHooks/courses";
import { useFetchAllStaff } from "../../../helpersAPIHooks/staff";
import { IClassEntry } from "../ClassesTable";
import { LoadingOutlined } from "@ant-design/icons";

const SetupClassesTeacherForSession = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const sessionId = globalState?.currentSchool?.currentSessionId as string;

  const [staffHint, setStaffHint] = useState<string | undefined>();

  const { data: levelsData, isSuccess: isLevelSuccess } = useFetchClasses({
    schoolId,
    token,
    pagination: {
      limit: 200,

      page: 1,
    },
    // searchParams: {
    //   name: searchTerm,
    // },
  });

  const { data: staffData, isSuccess: isStSucess } = useFetchAllStaff({
    schoolId,
    token,
    pagination: {
      limit: 200,

      page: 1,
    },
    searchParams: {
      name: staffHint,
    },
  });

  const { mutate, isLoading } = useAssignStaffToHandleSessionClasses();

  const handleFinish = (data: any) => {
    const classStaffIds = Object.entries(data).map((item: any) => ({
      levelId: item[0],
      staffId: item[1],
    }));
    if (schoolId) {
      const props: IAStaffTHSClass = {
        schoolId,
        token,
        classStaffIds,
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
          console.log("TEST SSSS", res);

          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
        },
      });
    }
  };
  const [form] = Form.useForm();
  const {
    data: courseTeacherRecords,
    isSuccess: isCourseTeacherRecordSuccess,
  } = useFetchClassTeacherRecordsPerSession();

  useEffect(() => {
    if (isLevelSuccess && isCourseTeacherRecordSuccess) {
      levelsData?.data.forEach((item: IClassEntry) => {
        const record = courseTeacherRecords.data.find(
          (val) => val.levelId === item.id
        );
        form.setFieldValue(item.id, record?.staffId);
      });
    }
  }, [
    form,
    isLevelSuccess,
    isCourseTeacherRecordSuccess,
    levelsData,
    courseTeacherRecords,
  ]);
  return (
    <div>
      {" "}
      <div className="mt-6">
        <Form onFinish={handleFinish} requiredMark={false} form={form}>
          <div className="flex items-center justify-end">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Save Class Teachers
            </Button>
          </div>
          <div className="mt-2">
            <Typography.Title level={5}>
              Select the class teacher for each class
            </Typography.Title>

            <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
              {isLevelSuccess &&
                isCourseTeacherRecordSuccess &&
                levelsData?.data.map((item: IClassEntry) => (
                  <Form.Item
                    name={`${item.id}`}
                    label={item.name}
                    labelCol={{ span: 24 }}
                    // wrapperCol={{ span: 24 }}
                    rules={generalValidationRules}
                  >
                    <Select
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
                        staffData?.data.map((item) => (
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
                ))}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SetupClassesTeacherForSession;
