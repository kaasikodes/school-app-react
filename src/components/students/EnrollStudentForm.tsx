import {
  AutoComplete,
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Typography,
  Upload,
  Collapse,
  Col,
  Row,
  Switch,
  Checkbox,
  Spin,
} from "antd";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { IStudentEntry } from "./StudentsTable";
import { ICourseEntry } from "../courses/SchoolSessionCoursesTable";
import { useMutation, useQuery } from "react-query";

import { getCourses } from "../../helpers/courses";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { IEnrollStudentProps } from "../../helpers/students";
import { UploadOutlined } from "@ant-design/icons";
import { TPaymentCategry } from "../../appTypes/payments";
import { getClasses } from "../../helpers/classes";
import { openNotification } from "../../helpers/notifications";
import PageLoader from "../loaders/PageLoader";
import { getPaymentCategories } from "../../helpers/payments";

const options = [
  { studentNo: "123", value: "Koplom Dung", id: 2 },
  { studentNo: "143", value: "Alex Jones", id: 34 },
  { studentNo: "120", value: "Potter Catter", id: 23 },
];

const { Panel } = Collapse;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const EnrollStudentForm = () => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const sessionId = authDetails.choosenSchoolCurrentSessionId ?? "0";
  const [form] = Form.useForm();
  const [exStudent, setExStudent] = useState(false);

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
    isError,
    isFetching,
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

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

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
        {isLSuccess && isPCSuccess ? (
          <Form
            labelCol={{ span: 24 }}
            form={form}
            // onFinish={handleSubmit}
            size="small"
          >
            <div className="flex flex-col gap-4">
              <Collapse defaultActiveKey={["1"]} accordion>
                <Panel
                  header="Student Information"
                  key="1"
                  disabled={exStudent}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="First Name" name="firstName">
                      <Input disabled={exStudent} />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName">
                      <Input disabled={exStudent} />
                    </Form.Item>
                    <Form.Item label="Middle Name (optional)" name="middleName">
                      <Input disabled={exStudent} />
                    </Form.Item>
                    <Form.Item label="ID Number" name="idNo">
                      <Input disabled={exStudent} />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input disabled={exStudent} />
                    </Form.Item>
                    <Form.Item label="Phone (optional)" name="phone">
                      <Input disabled={exStudent} />
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
                <Panel header="Custodian Information" key="3">
                  <div>Should be a dynamic add on single</div>
                  <div>Should be a single add on bulk</div>
                  <div>
                    phone, name, title, profession, email, alt phone, alt email
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

export default EnrollStudentForm;
