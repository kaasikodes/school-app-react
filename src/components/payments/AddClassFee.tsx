import { Button, Form, Input, InputNumber, Select, Switch, Upload } from "antd";
import React from "react";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { ICreateClassFeeProps } from "../../helpers/payments";
import { UploadOutlined } from "@ant-design/icons";

const AddClassFee = () => {
  const [form] = Form.useForm();

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const handleSubmit = (data: any) => {
    if (schoolId) {
      const props: ICreateClassFeeProps = {
        levelId: data.levelId,
        sessionId: data.sessionId,
        categoryId: data.categoryId,
        docUrl: data.docUrl,
        amount: data.amount.value,
        inPart: data.inPart,
        currencyId: data.amount.currency,
        token,
        schoolId,
      };
      console.log("prps", props, data);
      return;
    }
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <div>
      <Form
        form={form}
        requiredMark={false}
        labelCol={{ span: 24 }}
        onFinish={handleSubmit}
      >
        {/* $result = SchoolLevelFee::create(['school_id'=>$request->schoolId,'level_id'=>$request->levelId, 'school_session_id'=>$request->sessionId,'fee_category_id'=>$request->categoryId, 'breakdown_document_url' => $request->docUrl, 'amount'=>$request->amount, 'can_be_installmental' => $request->inPart]); */}
        {/* payment category and class should be unique (backend), if exits dn't create */}
        <Form.Item name="levelId" label="Class">
          <Select options={[]} />
        </Form.Item>
        <Form.Item name="categoryId" label="Payment Category">
          <Select options={[]} />
        </Form.Item>
        <Form.Item name="amount" label="Total amount to be paid">
          <Input.Group compact>
            <Form.Item noStyle name={["amount", "value"]}>
              <InputNumber />
            </Form.Item>
            <Form.Item noStyle name={["amount", "currency"]}>
              <Select options={[]} />
            </Form.Item>
          </Input.Group>
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
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="inPart" label="Can fee be paid installmentally ?">
          <Switch unCheckedChildren="No" checkedChildren="Yes" />
        </Form.Item>
        <div className="flex justify-end">
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddClassFee;
