import { Button, Form, Input, Select, Spin, Switch } from "antd";
import React, { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { saveSchoolCourse } from "../../../helpers/courses";
import { LoadingOutlined } from "@ant-design/icons";
import { openNotification } from "../../../helpers/notifications";
import { getDepartments } from "../../../helpers/department";
import ComponentLoader from "../../loaders/ComponentLoader";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../../appTypes/auth";
import { useFetchDepartments } from "../../../helpersAPIHooks/departments";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";

interface IProps {
  handleClose: Function;
}

const AddSchoolCourse = ({ handleClose }: IProps) => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const token = authDetails.userToken;
  const {
    data: departmentData,

    isSuccess,
  } = useFetchDepartments({
    schoolId,
    token,
    pagination: {
      limit: 1000,

      page: 1,
    },
  });
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
            {isSuccess ? (
              departmentData.data.map((item: any) => (
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
