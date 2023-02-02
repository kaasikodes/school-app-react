import React from "react";
import { Button, Form, Select } from "antd";

interface IProps {
  courseId?: string;
  levelId?: string;
}

const AddCourseParticipantForm = ({ courseId = "", levelId = "" }: IProps) => {
  return (
    <div>
      <Form labelCol={{ span: 24 }}>
        <Form.Item label="Select a student to add to course.">
          <Select />
        </Form.Item>
        <Button type="primary">Add Participant</Button>
      </Form>
    </div>
  );
};

export default AddCourseParticipantForm;
