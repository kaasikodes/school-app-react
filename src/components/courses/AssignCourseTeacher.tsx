import { Form, Select, Spin, Button } from "antd";
import { useAuthUser } from "react-auth-kit";
import { useQuery } from "react-query";
import { IAuthDets } from "../../appTypes/auth";
import { IStaffEntry } from "../../appTypes/staff";
import { getClasses } from "../../helpers/classes";
import { getAllStaff } from "../../helpers/staff";

import { ICourseEntry } from "../settings/courses/SchoolCoursesTable";

const AssignCourseTeacher = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const { data: staff, isLoading } = useQuery<any, any, any, any>(
    ["staff"],
    () => {
      return getAllStaff({
        token,
        schoolId: schoolId as string,
        page: 1,
        limit: 1000,
      });
    },
    {
      select: (res: any) => {
        const result = res.data.data;

        console.log("staff", result);
        const fStaff = result.map(
          (item: any): IStaffEntry => ({
            id: item.id,
            name: item.staff_no,
            staffNo: item.staff_no,
            photo: item?.photo,

            courseCount: item?.courseCount,
            groupCount: item?.groupCount,
          })
        );
        return fStaff;
      },
    }
  );
  const {
    data: classes,
    isLoading: isCLoading,
    isError: isCError,
    isFetched,
    isSuccess,
  } = useQuery<any, any, any, any>(
    ["courses"],
    () =>
      getClasses({
        token,
        schoolId: schoolId as string,
        page: 1,
        limit: 1000,
      }),

    {
      select: (res: any) => {
        const result = res.data.data;
        console.log("courses", result);

        const fCourses: ICourseEntry[] = result.map(
          (item: any): ICourseEntry => ({
            id: item.id,
            name: item.name,
            description: item.description,
            department: item?.department_id,
            isActive: item.isActive,
            levelCount: item?.levelCount,
            studentCount: item?.studentCount,
            teacherCount: item?.teacherCount,
            addedBy: item?.addedBy,
            createdAt: item?.created_at,
          })
        );

        return fCourses;
      },
    }
  );
  const handleFinish = (data: any) => {};
  return (
    <div>
      <Form
        requiredMark={false}
        labelCol={{ span: 24 }}
        onFinish={handleFinish}
      >
        <Form.Item label={`Staff`} name="staffId">
          <Select mode="multiple">
            {!isLoading ? (
              staff.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
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
          label={`What class(es) is the staff teaching ? `}
          name="levelId"
        >
          <Select mode="multiple">
            {!isCLoading ? (
              classes.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))
            ) : (
              <div className="flex justify-center items-center w-full">
                <Spin size="small" />
              </div>
            )}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" className="w-full">
            Assign Course Teacher
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AssignCourseTeacher;
