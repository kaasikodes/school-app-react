import { Button, Form, Input, InputNumber, Space, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { LoadingOutlined } from "@ant-design/icons";

import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { openNotification } from "../../helpers/notifications";
import { saveSchoolCRTemplate } from "../../helpers/schoolCRecordTemplates";

interface IProps {
  handleClose: Function;
}
interface ICRTData {
  title: string;
  breakDown: {
    name: string;
    value: string;
  }[];
}
const CreateCourseAssessmentTemplateForm = ({ handleClose }: IProps) => {
  const auth = useAuthUser();
  const queryClient = useQueryClient();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const { mutate } = useMutation(
    (crtData: ICRTData) =>
      saveSchoolCRTemplate({
        token,
        schoolId: schoolId as unknown as string,
        title: crtData.title,
        breakDown: crtData.breakDown,
      }),
    {
      onSuccess: (res: any) => {
        const result = res?.data;
        console.log(result, "res");
        // queryClient.invalidateQueries("cr-templates");

        openNotification({
          state: "success",
          title: "Success",
          description: `${
            result.message ?? "Course Record Template was created successfully."
          } `,
        });
        queryClient.invalidateQueries({
          queryKey: ["course-record-templates"],
          // exact: true,
        });
        handleClose();
      },
      onError: (err: any) => {
        console.log(err);
        openNotification({
          state: "error",
          title: "Error occurs",
          description: `Course Record Template was not created!`,
        });
      },
    }
  );

  const onFinish = (data: any) => {
    openNotification({
      state: "info",
      title: "Wait a minute",
      description: <LoadingOutlined />,
    });
    console.log("Received data of form:", data);
    mutate({
      title: data.title,
      breakDown: data.breakDown,
    });
  };
  const [percentageLeft, setPercentageLeft] = useState(0);
  useEffect(() => {
    console.log("percent", percentageLeft);
  }, [percentageLeft]);
  return (
    <div>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        labelCol={{ span: 24 }}
      >
        <Form.Item name={"title"} label="Template title">
          <Input placeholder="Template title" />
        </Form.Item>
        <div className="flex flex-col gap-3">
          <Typography.Text>Assessment Breakdown</Typography.Text>
          <Form.List name="breakDown">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      rules={[
                        { required: true, message: "Missing Field name" },
                      ]}
                    >
                      <Input placeholder="Field Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[
                        {
                          required: true,
                          message: "Percentage cannot be empty",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Field Percentage"
                        onChange={(val: any) =>
                          setPercentageLeft((percent) => percent + val)
                        }
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    disabled={percentageLeft === 100}
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCourseAssessmentTemplateForm;
