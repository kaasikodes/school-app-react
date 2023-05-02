import { Form, Input } from "antd";
import { useContext } from "react";
import { openNotification } from "../../helpers/notifications";

import { LoadingOutlined } from "@ant-design/icons";

import ComponentLoader from "../loaders/ComponentLoader";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useQueryClient } from "react-query";
import {
  useFetchSingleClass,
  useUpdateSingleClass,
} from "../../helpersAPIHooks/classes";
import { TLevel } from "../../appTypes/levels";
import { IUpdateClassProps } from "../../helpers/classes";

interface IProps {
  closeDrawer: Function;

  id: string;
}

const ViewClass = ({ closeDrawer, id }: IProps) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  // const adminId = globalState?.currentSchool?.adminId as string;

  const { mutate } = useUpdateSingleClass();

  const handleFinish = (data: any) => {
    if (schoolId) {
      const props: IUpdateClassProps = {
        schoolId,
        token,
        name: data.name,
        description: data.description,
        // adminId,
        classId: id,
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

          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
          form.resetFields();

          closeDrawer();

          queryClient.invalidateQueries({
            queryKey: ["classes"],
            // exact: true,
          });
        },
      });
    }
  };

  const { isSuccess } = useFetchSingleClass({
    id,
    schoolId,
    token,
    onSuccess: (data: TLevel) => {
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
          <Form.Item label={`Class name`} name="name">
            <Input placeholder="Class name" required />
          </Form.Item>
          <Form.Item label={`Description (optional)`} name="description">
            <Input.TextArea placeholder="Describe the class" rows={4} />
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ViewClass;
