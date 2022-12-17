import { Button, Form, Input, Select } from "antd";
import React from "react";
import {
  textInputValidationRules,
  generalValidationRules,
  emailValidationRules,
} from "../../formValidation";
import { GooglePlusCircleFilled } from "@ant-design/icons";

const RegisterSchoolForm = () => {
  return (
    <Form layout="vertical" requiredMark={false} className="w-3/5">
      <Form.Item
        // label="Full Name"
        name="fullName"
        rules={textInputValidationRules}
      >
        <Input placeholder="Full Name" />
      </Form.Item>
      <Form.Item
        // label="School Name"
        name="schoolName"
        rules={textInputValidationRules}
      >
        <Input placeholder="School Name" />
      </Form.Item>
      <Form.Item
        // label="Email"
        name="email"
        rules={emailValidationRules}
      >
        <Input placeholder="School Email" />
      </Form.Item>
      <Form.Item
        name="phone"
        //   label="Phone"
      >
        <Input.Group compact>
          <Form.Item
            noStyle
            rules={generalValidationRules}
            name={["phone", "code"]}
          >
            {
              <Select
                placeholder="Country Code"
                // showSearch
                // allowClear
                // optionLabelProp="label"
                className="rounded border-slate-400"
                style={{ width: "25%" }}
                options={[{ id: "234", code: "234" }].map((item) => ({
                  label: `+${item.code}`,
                  value: item.id,
                }))}
              />
            }
          </Form.Item>
          <Form.Item
            noStyle
            rules={textInputValidationRules}
            name={["phone", "number"]}
          >
            <Input
              style={{ width: "75%" }}
              placeholder="Phone Number"
              className="rounded border-slate-400 text-left"
              autoComplete="phone"
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item
        name="password"
        // label="Password"
        rules={[
          {
            required: true,
            message: "Field is required",
          },
          {
            min: 8,
            message: "password must be at least 6 characters",
          },
          // {
          //   validator: (_, value) =>
          //     value && value.includes("A")
          //       ? Promise.resolve()
          //       : Promise.reject("Password does not match criteria."),
          // },
        ]}
      >
        <Input.Password
          placeholder="Password"
          className="rounded border-slate-400"
          style={{ padding: "6px 5px" }}
          autoComplete="new-password"
        />
      </Form.Item>
      <Form.Item>
        <div className="flex flex-col gap-4">
          <Button type="primary" className="w-full" htmlType="submit">
            Register
          </Button>
          <Button
            type="ghost"
            className="w-full items-center"
            icon={<GooglePlusCircleFilled className="text-xl " />}
          >
            Sign up with Google
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default RegisterSchoolForm;
