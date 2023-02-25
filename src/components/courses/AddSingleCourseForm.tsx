import { Form, Input, Button, Checkbox, Select, Spin } from "antd";
import { useContext, useState } from "react";
import { openNotification } from "../../helpers/notifications";

import { LoadingOutlined } from "@ant-design/icons";

import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import {
  generalValidationRules,
  textInputValidationRules,
  textInputValidationRulesOp,
} from "../../formValidation";
import { useQueryClient } from "react-query";
import { useFetchClasses } from "../../helpersAPIHooks/classes";
import { useAddSingleCourse } from "../../helpersAPIHooks/courses";
import { ISaveCourseProps } from "../../helpers/courses";
import { useFetchDepartments } from "../../helpersAPIHooks/departments";

interface IProps {
  closeDrawer: Function;
}

// TO DO
// Refactor this to use react query & indicate a loading state on sbmt btn (also disable)

const AddSingleCourseForm = ({ closeDrawer }: IProps) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;

  const { mutate, isLoading } = useAddSingleCourse();

  const handleFinish = (data: any) => {
    if (schoolId) {
      const props: ISaveCourseProps = {
        schoolId,
        token,
        name: data.name,
        description: data.description,
        levels: data.levels,
        departmentId: data.departmentId,
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

  const [searchTerm, setSearchTerm] = useState("");
  const { data: classesData, isSuccess: isCSuccess } = useFetchClasses({
    schoolId,
    token,
  });
  const {
    data: departmentData,
    isError,
    isFetching,
    isSuccess,
  } = useFetchDepartments({
    schoolId,
    token,
    pagination: {
      limit: 4,
      page: 1,
    },
    searchParams: {
      name: searchTerm,
    },
  });
  return (
    <div>
      <Form
        requiredMark={false}
        labelCol={{ span: 24 }}
        onFinish={handleFinish}
        form={form}
      >
        <Form.Item
          label={`Course name`}
          name="name"
          rules={textInputValidationRules}
        >
          <Input placeholder="Course name" />
        </Form.Item>
        <Form.Item
          label={`Department`}
          name="departmentId"
          rules={generalValidationRules}
        >
          <Select
            onSearch={(val) => setSearchTerm(val)}
            showSearch
            value={searchTerm}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            // onChange={handleChange}
            notFoundContent={"No Data"}
          >
            {/* TO DO
            Convert all select to api searchable dropdowns */}
            {isSuccess ? (
              departmentData.data.map((item) => (
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
          label={`Description (optional)`}
          name="description"
          rules={[...textInputValidationRulesOp]}
        >
          <Input.TextArea placeholder="Describe the course" rows={4} />
        </Form.Item>

        <Form.Item
          // rules={generalValidationRulesOp}
          label="What classes will this be taught in ?(optional)"
          name={"levels"}
        >
          <Checkbox.Group
            options={classesData?.data.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className="w-full"
            loading={isLoading}
          >
            Add Course
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSingleCourseForm;
