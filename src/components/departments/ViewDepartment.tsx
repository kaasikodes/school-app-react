import { Form, Input } from "antd";
import { useContext } from "react";
import { openNotification } from "../../helpers/notifications";

import { LoadingOutlined } from "@ant-design/icons";

import ComponentLoader from "../loaders/ComponentLoader";

import { IUpdateDeptProps } from "../../helpers/department";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { TDepartment } from "../../appTypes/departments";
import {
  useFetchSingleDepartment,
  useUpdateSingleDepartment,
} from "../../helpersAPIHooks/departments";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useQueryClient } from "react-query";

interface IProps {
  closeDrawer: Function;

  id: string;
}

const ViewDepartmentForm = ({ closeDrawer, id }: IProps) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const adminId = globalState?.currentSchool?.adminId as string;

  const { mutate, isLoading } = useUpdateSingleDepartment();

  const handleFinish = (data: any) => {
    if (schoolId) {
      const props: IUpdateDeptProps = {
        schoolId,
        token,
        name: data.name,
        description: data.description,
        adminId,
        departmentId: id,
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
            queryKey: ["departments"],
            // exact: true,
          });
        },
      });
    }
  };

  const { isSuccess } = useFetchSingleDepartment({
    id,
    schoolId,
    token,
    onSuccess: (data: TDepartment) => {
      form.setFieldsValue({
        name: data.name,
        description: data.description,
      });
    },
  });

  // pheripherals

  return (
    <div>
      {!isSuccess ? (
        <ComponentLoader />
      ) : (
        <Form
          requiredMark={false}
          labelCol={{ span: 24 }}
          onFinish={handleFinish}
          form={form}
          disabled
        >
          <Form.Item label={`Department name`} name="name">
            <Input placeholder="Department name" required />
          </Form.Item>
          <Form.Item label={`Description (optional)`} name="description">
            <Input.TextArea placeholder="Describe the department" rows={4} />
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ViewDepartmentForm;
