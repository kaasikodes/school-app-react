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
} from "antd";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { IStudentEntry } from "./StudentsTable";
import { ICourseEntry } from "../courses/SchoolSessionCoursesTable";
import { useQuery } from "react-query";

import { getCourses } from "../../helpers/courses";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";

const { Dragger } = Upload;

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
  const [form] = Form.useForm();
  const [exStudent, setExStudent] = useState(false);
  const handleExStudentSelect = (val: any, option: any) => {
    if (val === "") {
      setExStudent(false);
      return;
    }
    setExStudent(true);

    form.setFieldsValue({
      firstName: "James",
      lastName: "Doe",
      middleName: "Poe",
      classId: 13,
    });
  };
  const handleExStudentClear = () => {
    setExStudent(false);
  };
  const handleSubmit = (data: any) => {
    console.log("Data ", data);
  };

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

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const {
    data: courses,
    isLoading,
    isError,
    isFetched,
    isSuccess,
  } = useQuery<ICourseEntry, any, any, any>(
    ["courses"],
    () =>
      getCourses({
        token,
        schoolId: schoolId as string,
        limit: 1000,
      }),

    {
      select: (res: any) => {
        const result = res.data.data;
        console.log(res.data);

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

  return (
    <div className="flex flex-col gap-4">
      {/* select existing student (via id/name) */}
      <div className="flex flex-col items-start gap-4">
        <Typography.Text>Select an Existing Student</Typography.Text>
        <AutoComplete
          className="w-2/4"
          options={options}
          placeholder="Type Existing Student name/id"
          filterOption={(inputValue, option) =>
            option!.studentNo
              .toUpperCase()
              .indexOf(inputValue.toUpperCase()) !== -1 ||
            option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onChange={handleExStudentSelect}
          onClear={handleExStudentClear}
          allowClear
        />
      </div>
      {/* fill out the form ne student */}
      {/* 1.) name, class, Payment Info, custodian info 2.) select the courses student offers or skip process 3.) Confirm info(show all) */}
      <div className="flex flex-col gap-4">
        <Form labelCol={{ span: 24 }} form={form} onFinish={handleSubmit}>
          <div className="flex flex-col gap-4">
            <Collapse defaultActiveKey={["1"]} accordion>
              <Panel header="Student Information" key="1" disabled={exStudent}>
                <div className="grid grid-cols-2 gap-2">
                  <Form.Item label="First Name" name="firstName">
                    <Input disabled={exStudent} />
                  </Form.Item>
                  <Form.Item label="Last Name" name="lastName">
                    <Input disabled={exStudent} />
                  </Form.Item>
                  <Form.Item label="Middle Name" name="middleName">
                    <Input disabled={exStudent} />
                  </Form.Item>
                  <Form.Item label="Select a Class" name="classId">
                    <Select disabled={exStudent}>
                      <Select.Option key="Jss 1a" value={12}>
                        Jss 1a
                      </Select.Option>
                      <Select.Option key="Jss 2a" value={13}>
                        Jss 2a
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </Panel>

              <Panel header="Payment Information" key="2">
                <div className="grid grid-cols-1 gap-2">
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
                  <Form.Item label="Document for Proof" name="document">
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit
                        from uploading company data or other band files
                      </p>
                    </Dragger>
                  </Form.Item>
                </div>
              </Panel>
              <Panel header="Select Courses" key="3">
                <div className="grid grid-cols-1 gap-2">
                  <Form.Item
                    name={"courses"}
                    label={
                      <Typography.Title level={5}>
                        Select the courses
                      </Typography.Title>
                    }
                    labelCol={{ span: 24 }}
                    // wrapperCol={{ span: 24 }}
                  >
                    <Checkbox.Group className="w-full">
                      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                        {isSuccess &&
                          courses.map((item: ICourseEntry) => (
                            <div key={item.id}>
                              <Checkbox value={item.id}>{item.name}</Checkbox>
                            </div>
                          ))}
                      </div>
                    </Checkbox.Group>
                  </Form.Item>
                </div>
              </Panel>
            </Collapse>

            <div className="flex justify-end items-center">
              {/* <Typography.Title level={5}>Add a New Student</Typography.Title> */}

              <Form.Item label="">
                <Button htmlType="submit" type="primary">
                  Enroll Student
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EnrollStudentForm;
