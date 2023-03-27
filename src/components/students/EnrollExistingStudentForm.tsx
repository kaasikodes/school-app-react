import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Collapse,
} from "antd";
import React, { useState } from "react";

import { useQuery } from "react-query";

import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { getStudent } from "../../helpers/students";
import { UploadOutlined } from "@ant-design/icons";
import { TPaymentCategry } from "../../appTypes/payments";
import { getClasses } from "../../helpers/classes";
import { openNotification } from "../../helpers/notifications";
import PageLoader from "../loaders/PageLoader";
import { getPaymentCategories } from "../../helpers/payments";

const { Panel } = Collapse;

interface IProps {
  handleClose: Function;
  studentId: string;
}
const EnrollExistingStudentForm = ({ handleClose, studentId }: IProps) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const sessionId = authDetails.choosenSchoolCurrentSessionId ?? "1";
  const [form] = Form.useForm();
  const [exStudent] = useState(false);

  // student
  const { isSuccess: isStSuccess } = useQuery(
    ["student", studentId],
    () =>
      getStudent({ schoolId: schoolId as string, token, studentId, sessionId }),
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      onError: (err: any) => {
        // show notification
        openNotification({
          state: "error",
          title: "Error Occured",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      onSuccess: (res: any) => {
        const data = res.data;
        // console.log("QUIL", data, res.data);
        // return;
        const firstName = data.user.name.split(" ")[0];
        const lastName = data.user.name.split(" ")[1];
        const middleName = data.user.name.split(" ")[2];
        const email = data.user.email;
        const idNo = data.data.id_number;
        const phone = data.data.alt_phone;
        const student = {
          firstName,
          lastName,
          middleName,
          idNo,
          email,
          phone,
        };
        form.setFieldsValue({ ...student });
      },
    }
  );
  // classes
  const {
    data: levels,

    isSuccess: isLSuccess,
  } = useQuery(
    "levels",
    () => getClasses({ schoolId: schoolId as string, token }),
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      onError: (err: any) => {
        // show notification
        openNotification({
          state: "error",
          title: "Error Occured",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      onSuccess: (data: any) => {},
      select: (res: any) => {
        const result = res.data.data;

        const data: TPaymentCategry[] = result.map(
          (item: any): TPaymentCategry => ({
            id: item.id,
            name: item.name,
            description: item?.description,
          })
        );

        return data;
      },
    }
  );
  // pcs
  const {
    data: paymentCategories,

    isSuccess: isPCSuccess,
  } = useQuery(
    "payment-cats",
    () => getPaymentCategories({ schoolId: schoolId as string, token }),
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      onError: (err: any) => {
        // show notification
        openNotification({
          state: "error",
          title: "Error Occured",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      onSuccess: (data: any) => {},
      select: (res: any) => {
        const result = res.data.data;
        console.log("result", result);

        const data: TPaymentCategry[] = result.map(
          (item: any): TPaymentCategry => ({
            id: item.id,
            name: item.name,
            description: item?.description,
          })
        );

        return data;
      },
    }
  );
  // const { mutate, isLoading } = useMutation(enrollStudent);

  // const handleSubmit = (data: any) => {
  //   console.log("Data ", data);
  //   if (schoolId && sessionId) {
  //     const props: IEnrollStudentProps = {
  //       name: `${data.firstName} ${(data.middleName ?? "") + " "}${
  //         data.lastName
  //       }`,
  //       email: data.email,
  //       currentClassId: data.currentClassId,
  //       paymentCategoryId: data.paymentCategoryId,
  //       schoolFeeAmountPaid: data.amountPaid,
  //       currentSessionId: sessionId, //this should always be created by default when school is created
  //       popDocumentUrl: "state url",
  //       idNo: data.idNo,
  //       schoolId: schoolId as unknown as string,
  //       token: token as unknown as string,
  //       note: data.note,
  //     };

  //     console.log("prps", props, data);
  //     openNotification({
  //       state: "info",
  //       title: "Wait a second ...",
  //       // description: <Progress percent={80} status="active" />,
  //       description: <Spin />,
  //     });
  //     mutate(props, {
  //       onError: (err: any) => {
  //         openNotification({
  //           state: "error",
  //           title: "Error Occured",
  //           description:
  //             err?.response.data.message ?? err?.response.data.error.message,
  //         });
  //       },
  //       onSuccess: (res: any) => {
  //         const result = res.data.data;

  //         openNotification({
  //           state: "success",

  //           title: "Success",
  //           description: res.data.message,
  //           // duration: 0.4,
  //         });

  //         form.resetFields();
  //       },
  //     });
  //     return;
  //   }
  // };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <div className="flex flex-col gap-4">
      {/* fill out the form ne student */}
      {/* 1.) name, class, Payment Info, custodian info 2.) select the courses student offers or skip process 3.) Confirm info(show all) */}
      <div className="flex flex-col gap-4">
        {isLSuccess && isPCSuccess && isStSuccess ? (
          <Form
            labelCol={{ span: 24 }}
            form={form}
            // onFinish={handleSubmit}
            size="small"
          >
            <div className="flex flex-col gap-4">
              <Collapse defaultActiveKey={["1"]} accordion>
                <Panel header="Student Information" key="1">
                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="First Name" name="firstName">
                      <Input disabled />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName">
                      <Input disabled />
                    </Form.Item>
                    <Form.Item label="Middle Name (optional)" name="middleName">
                      <Input disabled />
                    </Form.Item>
                    <Form.Item label="ID Number" name="idNo">
                      <Input disabled />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input disabled />
                    </Form.Item>
                    <Form.Item label="Phone (optional)" name="phone">
                      <Input disabled />
                    </Form.Item>
                  </div>
                </Panel>

                <Panel header="Payment Information" key="2">
                  <div className="grid md:grid-cols-2 gap-2">
                    <Form.Item
                      label="Payment Category"
                      name="paymentCategoryId"
                      className="w-full"
                    >
                      <Select
                        options={paymentCategories.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Select Class to Enroll"
                      name="currentClassId"
                    >
                      <Select
                        options={levels.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))}
                        disabled={exStudent}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Amount"
                      name="amountPaid"
                      className="w-full"
                    >
                      <InputNumber
                        placeholder="amount paid (should validate against policy)"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>

                    <Form.Item
                      name="docUrl"
                      label="Document"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        name="logo"
                        action="/upload.do"
                        listType="picture"
                        beforeUpload={() => false}
                        style={{ width: "100%" }}
                      >
                        <Button icon={<UploadOutlined />}>
                          Click to upload
                        </Button>
                      </Upload>
                    </Form.Item>
                    <Form.Item
                      label="Note(optional)"
                      name="note"
                      className="w-full col-span-2"
                    >
                      <Input.TextArea
                        placeholder="Extra note"
                        style={{ width: "100%" }}
                        rows={6}
                      />
                    </Form.Item>
                  </div>
                </Panel>
              </Collapse>

              <div className="flex justify-end items-center">
                {/* <Typography.Title level={5}>Add a New Student</Typography.Title> */}

                <Button htmlType="submit" type="primary">
                  Enroll Student
                </Button>
              </div>
            </div>
          </Form>
        ) : (
          <PageLoader />
        )}
      </div>
    </div>
  );
};

export default EnrollExistingStudentForm;
