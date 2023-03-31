import { Button, Form, Typography } from "antd";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import { FormStaffInput } from "../../../customFormComponents/FormStaffInput";
import { openNotification } from "../../../helpers/notifications";
import { useFetchSingleClass } from "../../../helpersAPIHooks/classes";
import { useAssignStaffToLevelCoursesForSession } from "../../../helpersAPIHooks/courses";
import useApiAuth from "../../../hooks/useApiAuth";

export const SelectTeacherForCourses: React.FC<{ classId: number }> = ({
  classId,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { schoolId, token, sessionId } = useApiAuth();
  const { data, isSuccess } = useFetchSingleClass({
    id: `${classId}`,
    schoolId: `${schoolId}`,
    token,
    sessionId,
  });

  useEffect(() => {
    if (isSuccess) {
      data.courses?.forEach((item) =>
        form.setFieldValue(item.id, item.courseSessionTeacherStaffId)
      );
    }
  }, [data, form, isSuccess]);

  const { mutate, isLoading } = useAssignStaffToLevelCoursesForSession();

  const handleFin = (data: any) => {
    const staffCourseIds = Object.entries(data).map(
      (val): { courseId: string; staffId: string } => ({
        courseId: val[0],
        staffId: val[1] as string,
      })
    );
    if (schoolId) {
      mutate(
        {
          schoolId: `${schoolId}`,
          token,
          sessionId: `${sessionId}`,
          staffCourseIds,
          levelId: `${classId}`,
        },
        {
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
            // form.resetFields();
            queryClient.invalidateQueries({
              queryKey: ["class", classId, sessionId],
            });
          },
        }
      );
    }
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <Typography.Title level={5}>
        Assign teachers to the courses taught in
      </Typography.Title>
      <Form form={form} onFinish={handleFin}>
        {data?.courses?.map((item) => (
          <FormStaffInput
            Form={Form}
            control={{ label: item.name, name: `${item.id}` }}
            key={item.id}
          />
        ))}

        <div className="flex flex-end">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};
