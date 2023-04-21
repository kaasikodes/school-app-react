import {
  Button,
  Form,
  Input,
  Select,
  Collapse,
  Checkbox,
  Spin,
  Space,
} from "antd";
import React, { useContext, useState } from "react";

import { useMutation, useQuery } from "react-query";

import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { enrollNewStudent, IEnrollStudentProps } from "../../helpers/students";
import { TPaymentCategry } from "../../appTypes/payments";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { openNotification } from "../../helpers/notifications";
import { getPaymentCategories } from "../../helpers/payments";
import { useFetchClasses } from "../../helpersAPIHooks/classes";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useFetchCoursesGroupedByLevel } from "../../helpersAPIHooks/courses";
import {
  generalValidationRules,
  textInputValidationRules,
  textInputValidationRulesOp,
} from "../../formValidation";
import { professions, genders } from "../../data";
import ComponentLoader from "../loaders/ComponentLoader";

const { Panel } = Collapse;

interface IProps {
  closeDrawer: Function;
}
const AddSingleStudentForm = ({ closeDrawer }: IProps) => {
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;

  const [form] = Form.useForm();
  const [exStudent] = useState(false);
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const [searchTerm] = useState("");
  const [levelId, setLevelId] = useState(0);

  // classes
  const { data: classesData, isSuccess: isLSuccess } = useFetchClasses({
    schoolId,
    token,

    searchParams: {
      name: searchTerm,
    },
  });
  // courses
  const { data: coursesData } = useFetchCoursesGroupedByLevel({
    schoolId,
    token,

    searchParams: {
      name: searchTerm,
    },
    levelId,
  });
  // pcs
  const { isSuccess: isPCSuccess } = useQuery(
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
  const { mutate } = useMutation(enrollNewStudent);

  const handleSubmit = (data: any) => {
    // TO DO
    // Create Professions and use auto-complete/ add profession if not found
    if (schoolId) {
      const props: IEnrollStudentProps = {
        name: `${data.firstName} ${(data.middleName ?? "") + " "}${
          data.lastName
        }`,
        email: data.email,
        currentClassId: data.currentClassId,
        phone: data.phone,
        idNo: data.idNo,

        sessionCourses: data.courses.map((item: number) => ({
          levelId: data.currentClassId,
          courseId: item,
        })),
        custodians: data?.custodians?.map((item: any) => ({
          name: item.name,
          occupation: item.occupation,
          email: item.email,
          phone: item.phone,
        })),

        schoolId: schoolId as unknown as string,
        token: token as unknown as string,
      };

      openNotification({
        state: "info",
        title: "Wait a second ...",
        // description: <Progress percent={80} status="active" />,
        description: <Spin />,
      });
      mutate(props, {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          form.resetFields();
        },
      });
      return;
    }
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
            onFinish={handleSubmit}
            size="small"
            requiredMark={false}
          >
            <div className="flex flex-col gap-4">
              <Collapse defaultActiveKey={["1"]} accordion>
                <Panel header="Student Information" key="1">
                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={textInputValidationRules}
                    >
                      <Input disabled={exStudent} />
                    </Form.Item>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={textInputValidationRules}
                    >
                      <Input disabled={exStudent} />
                    </Form.Item>
                    <Form.Item
                      label="Middle Name (optional)"
                      name="middleName"
                      rules={textInputValidationRulesOp}
                    >
                      <Input disabled={exStudent} />
                    </Form.Item>
                    <Form.Item
                      label="ID Number"
                      name="idNo"
                      rules={textInputValidationRules}
                    >
                      <Input disabled={exStudent} />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={textInputValidationRules}
                    >
                      <Input disabled={exStudent} />
                    </Form.Item>
                    <Form.Item
                      label="Phone (optional)"
                      name="phone"
                      rules={textInputValidationRulesOp}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Select Class to Enrollc"
                      name="currentClassId"
                      // rules={generalValidationRules} //TO DO -> Validation for this
                      required
                    >
                      <Select
                        options={classesData?.data.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))}
                        onChange={(val) => setLevelId(val)}
                      />
                    </Form.Item>
                  </div>
                </Panel>

                {/* <Panel header="Payment Information" key="2" >
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
                      name="currentClassId__"
                    >
                      <Select
                        options={classesData.data?.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))}
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
                </Panel> */}
                <Panel header="Custodian Information" key="3">
                  <Form.List name="custodians">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field) => (
                          <Space key={field.key} align="baseline">
                            <Form.Item
                              {...field}
                              label="Name"
                              name={[field.name, "name"]}
                              rules={textInputValidationRules}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              label="Occupation"
                              name={[field.name, "occupation"]}
                              rules={textInputValidationRules}
                            >
                              <Select
                                options={professions.map((item) => ({
                                  label: item,
                                  value: item,
                                }))}
                              />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              label="Email"
                              name={[field.name, "email"]}
                              rules={textInputValidationRules}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              label="Phone"
                              name={[field.name, "phone"]}
                              rules={textInputValidationRules}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              label="Gender"
                              name={[field.name, "gender"]}
                              rules={generalValidationRules}
                            >
                              <Select
                                options={genders.map((item) => ({
                                  label: item,
                                  value: item,
                                }))}
                              />
                            </Form.Item>

                            <MinusCircleOutlined
                              onClick={() => remove(field.name)}
                            />
                          </Space>
                        ))}

                        <Form.Item>
                          <Button
                            type="ghost"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            <span className="relative top-0.5">
                              Add Custodian
                            </span>
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  {/* <div>
                    phone, name, title, profession, email, alt phone, alt email
                  </div> */}
                </Panel>
                <Panel header="Course Combination (optional)" key="4">
                  <Form.Item name={"courses"}>
                    <Checkbox.Group
                      options={coursesData?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                    />
                  </Form.Item>
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
          <ComponentLoader />
        )}
      </div>
    </div>
  );
};

export default AddSingleStudentForm;
