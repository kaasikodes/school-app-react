import { Button, Form, Input, Select, Spin, Switch } from "antd";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { saveSchoolCourse } from "../../../helpers/courses";
import { LoadingOutlined } from "@ant-design/icons";
import { openNotification } from "../../../helpers/notifications";
import { getDepartments } from "../../../helpers/department";
import { IDepartmentEntry } from "../../departments/DepartmentsTable";
import ComponentLoader from "../../loaders/ComponentLoader";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../../appTypes/auth";

interface IProps {
  handleClose: Function;
}

const AddSchoolCourse = ({ handleClose }: IProps) => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const {
    data: departments,
    isLoading,
    isError,
    isFetched,
    isSuccess,
  } = useQuery<any, any, any, any>(
    "departments",
    () =>
      getDepartments({
        token,
        schoolId: schoolId as string,
        limit: 10000,
        // so you can get all items as you search and not alimited pagination

        searchTerm,
      }),
    {
      select: (res: any) => {
        const result = res.data.data;

        const fdepartments: IDepartmentEntry[] = result.map((item: any) => {
          return {
            id: item.id,
            name: item.name,

            levelCount: 0,
            courseCount: 0,
            parentCount: 0,
            studentCount: 0,
            staffCount: 0,
            ends: item.ends,
          };
        });
        return fdepartments;
      },
    }
  );
  const { mutate } = useMutation(
    (courseData: any) =>
      saveSchoolCourse({
        token,
        schoolId: schoolId as string,
        departmentId: courseData.departmentId,

        isActive: courseData.isActive,
        name: courseData.name,
        description: courseData.description,
      }),
    {
      onSuccess: (res: any) => {
        const result = res?.data;
        console.log(result, "res");
        queryClient.invalidateQueries("courses");

        openNotification({
          state: "success",
          title: "Success",
          description: `${
            result.message ?? "Course was created successfully."
          } `,
        });
        handleClose();
      },
      onError: (err: any) => {
        console.log(err);
        openNotification({
          state: "error",
          title: "Error occures",
          description: `Course was not created!`,
        });
      },
    }
  );
  const handleFinish = (data: any) => {
    openNotification({
      state: "info",
      title: "Wait a minute",
      description: <LoadingOutlined />,
    });
    const courseData = {
      departmentId: data.departmentId,

      isActive: data.isActive,
      name: data.name,
      description: data.description,
    };

    mutate(courseData);
  };

  return (
    <div>
      <Form
        requiredMark={false}
        labelCol={{ span: 24 }}
        onFinish={handleFinish}
      >
        <Form.Item label={`Name`} name="name">
          <Input placeholder="Course name" required />
        </Form.Item>
        <Form.Item label={`Description`} name="description">
          <Input.TextArea placeholder="Description" required />
        </Form.Item>
        <Form.Item label={`Department`} name="departmentId">
          <Select>
            {!isLoading ? (
              departments.map((item: any) => (
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
        <Form.Item label={`Is this course active ?`} name="isActive">
          <Switch title="isActive" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" className="w-full">
            Add Course
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSchoolCourse;
