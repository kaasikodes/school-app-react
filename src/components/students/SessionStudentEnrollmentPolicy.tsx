import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Switch,
} from "antd";
import moment from "moment";
import React, { useState } from "react";

const SessionStudentEnrollmentPolicy = () => {
  const handleFinish = (data: any) => {
    console.log("DATA =", data);
  };
  const [feePercent, showFeePercent] = useState(false);
  return (
    <div className="flex justify-between">
      <Form
        labelCol={{ span: 24 }}
        initialValues={{
          mustStudentPassPrevSession: true,
          mustStudentPaySchoolFees: true,
          feePercent: 80,
          paidLastSessionFees: true,
          enrollmentEndDate: moment(new Date().toDateString()),
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Students must pass previous session to be promoted ?"
          name="mustStudentPassPrevSession"
        >
          <Switch
            defaultChecked
            checkedChildren={"Yes"}
            unCheckedChildren={"No"}
          />
        </Form.Item>
        <Form.Item
          name="mustStudentPaySchoolFees"
          label="Students must pay school fees entirely to be enrolled/promoted ?"
        >
          <Switch
            defaultChecked
            onChange={(checked) => showFeePercent(!checked)}
            checkedChildren={"Yes"}
            unCheckedChildren={"No"}
          />
        </Form.Item>
        {feePercent && (
          <Form.Item
            name="feePercent"
            label="What percentage of the fee must be paid by student?"
          >
            <InputNumber defaultValue={80} />
          </Form.Item>
        )}
        <Form.Item
          name="paidLastSessionFees"
          label="Students must have fully paid last session fees ?"
        >
          <Switch
            defaultChecked
            checkedChildren={"Yes"}
            unCheckedChildren={"No"}
          />
        </Form.Item>
        <Form.Item
          name="enrollmentEndDate"
          label="What is the end date for enrollment ?"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="">
          <Button htmlType="submit">Save Policy</Button>
        </Form.Item>
      </Form>
      {/* <div>
        <p>Only the admin | custodian | student can enroll a student</p>
        <p>Student must pay 80% of fees or full</p>
        <p>Student must have passed previous session (be promoted)</p>
        <p>Student's parent must have paid PTA</p>
        <p>Student must have fully paid last session fees</p>
        <p>Student must have cleared all broke louvre ...</p>
        <p>
          Enrollment or Rather registration end date (necessary for the step
          process)
        </p>
      </div> */}
    </div>
  );
};

export default SessionStudentEnrollmentPolicy;
