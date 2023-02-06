import React, { useState } from "react";
import { EditFilled, SaveFilled } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const CourseOverview = () => {
  const [edit, setEdit] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        {edit ? (
          <Button icon={<EditFilled />} type="text" />
        ) : (
          <Button icon={<SaveFilled />} type="text" />
        )}
      </div>

      {edit ? (
        <>
          <Form labelCol={{ span: 24 }}>
            <Form.Item label="Brief" name="brief">
              <Input />
            </Form.Item>
            <Form.Item label="Breakdown" name="breakDown">
              <Input.TextArea rows={12} />
            </Form.Item>
          </Form>
        </>
      ) : (
        <>
          {/* brief */}
          <div className="border p-4 ">
            <p>This is a brief of the course</p>
          </div>
          {/* brakdown */}
          <div className="p-4">
            <p>This is breakdown of the course</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseOverview;
