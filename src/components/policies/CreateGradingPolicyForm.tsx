import { Form, Button, Input, InputNumber, Col, Row } from "antd";
import React from "react";

const CreateGradingPolicyForm = () => {
  const handleFinish = (data: any) => {
    console.log("GPOLICY", data);
    alert("GPLOCIY");
  };
  return (
    <div>
      <div>
        <Form
          labelCol={{ span: 4 }}
          initialValues={{
            gradeARemark: "Excellent",
            gradeBRemark: "Good",
            gradeCRemark: "Average",
            gradeDRemark: "Below Average",
            gradePRemark: "Pass",
            gradeFRemark: "Fail",
            gradeATo: 100,
            gradeAFrom: 70,
            gradeBTo: 69,
            gradeBFrom: 55,
            gradeCTo: 54,
            gradeCFrom: 45,
            gradeDTo: 44,
            gradeDFrom: 40,
            gradePTo: 39,
            gradePFrom: 20,
            gradeFTo: 19,
            gradeFFrom: 0,
          }}
          labelAlign="left"
          onFinish={handleFinish}
        >
          <Row gutter={4}>
            <Col span={24}>
              <span>Grade A</span>
            </Col>
            <Col span={24}>
              <div className="flex gap-2">
                <Form.Item name="gradeAFrom">
                  <InputNumber placeholder="from" max={99} />
                </Form.Item>
                <Form.Item name="gradeATo">
                  <InputNumber placeholder="to" disabled />
                </Form.Item>
                <Form.Item name="gradeARemark">
                  <Input placeholder="remark" />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={24}>
              <span>Grade B</span>
            </Col>
            <Col span={24}>
              <div className="flex gap-2">
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.gradeBTo !== currentValues.gradeBTo
                  }
                >
                  {({ getFieldValue }) => (
                    <Form.Item
                      name="gradeBFrom"
                      rules={[
                        { required: true },
                        {
                          type: "number",
                          message: "Must be a digit",
                        },
                        ({ getFieldValue }) => ({
                          validator() {
                            if (
                              getFieldValue("gradeBTo") <=
                              getFieldValue("gradeBFrom")
                            ) {
                              return Promise.reject(
                                new Error(
                                  "must be less than " +
                                    getFieldValue("gradeBTo")
                                )
                              );
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <InputNumber
                        max={getFieldValue("gradeBTo") - 1}
                        placeholder="from"
                      />
                    </Form.Item>
                  )}
                </Form.Item>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.gradeAFrom !== currentValues.gradeAFrom
                  }
                >
                  {({ getFieldValue }) => (
                    <Form.Item
                      name="gradeBTo"
                      rules={[
                        { required: true },
                        ({ getFieldValue }) => ({
                          validator() {
                            if (
                              getFieldValue("gradeBTo") !==
                              getFieldValue("gradeAFrom") - 1
                            ) {
                              return Promise.reject(
                                new Error(
                                  "must be equal to " +
                                    (getFieldValue("gradeAFrom") - 1)
                                )
                              );
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <InputNumber
                        max={getFieldValue("gradeAFrom") - 1}
                        placeholder="to"
                      />
                    </Form.Item>
                  )}
                </Form.Item>

                <Form.Item name="gradeBRemark">
                  <Input placeholder="remark" />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={24}>
              <span>Grade C</span>
            </Col>
            <Col span={24}>
              <div className="flex gap-2">
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.gradeCTo !== currentValues.gradeCTo
                  }
                >
                  {({ getFieldValue }) => (
                    <Form.Item name="gradeCFrom" rules={[{ required: true }]}>
                      <InputNumber
                        max={getFieldValue("gradeCTo") - 1}
                        placeholder="from"
                      />
                    </Form.Item>
                  )}
                </Form.Item>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.gradeBFrom !== currentValues.gradeBFrom
                  }
                >
                  {({ getFieldValue }) => (
                    <Form.Item name="gradeCTo" rules={[{ required: true }]}>
                      <InputNumber
                        max={getFieldValue("gradeBFrom") - 1}
                        placeholder="to"
                      />
                    </Form.Item>
                  )}
                </Form.Item>

                <Form.Item name="gradeCRemark">
                  <Input placeholder="remark" />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={24}>
              <span>Grade D</span>
            </Col>
            <Col span={24}>
              <div className="flex gap-2">
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.gradeDTo !== currentValues.gradeDTo
                  }
                >
                  {({ getFieldValue }) => (
                    <Form.Item name="gradeDFrom" rules={[{ required: true }]}>
                      <InputNumber
                        max={getFieldValue("gradeDTo") - 1}
                        placeholder="from"
                      />
                    </Form.Item>
                  )}
                </Form.Item>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.gradeCFrom !== currentValues.gradeCFrom
                  }
                >
                  {({ getFieldValue }) => (
                    <Form.Item name="gradeDTo" rules={[{ required: true }]}>
                      <InputNumber
                        max={getFieldValue("gradeCFrom") - 1}
                        placeholder="to"
                      />
                    </Form.Item>
                  )}
                </Form.Item>

                <Form.Item name="gradeDRemark">
                  <Input placeholder="remark" />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={24}>
              <span>Grade P</span>
            </Col>
            <Col span={24}>
              <div className="flex gap-2">
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.gradePTo !== currentValues.gradePTo
                  }
                >
                  {({ getFieldValue }) => (
                    <Form.Item name="gradePFrom" rules={[{ required: true }]}>
                      <InputNumber
                        max={getFieldValue("gradePTo") - 1}
                        placeholder="from"
                      />
                    </Form.Item>
                  )}
                </Form.Item>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.gradeDFrom !== currentValues.gradeDFrom
                  }
                >
                  {({ getFieldValue }) => (
                    <Form.Item name="gradePTo" rules={[{ required: true }]}>
                      <InputNumber
                        max={getFieldValue("gradeDFrom") - 1}
                        placeholder="to"
                      />
                    </Form.Item>
                  )}
                </Form.Item>

                <Form.Item name="gradePRemark">
                  <Input placeholder="remark" />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={24}>
              <span>Grade F</span>
            </Col>
            <Col span={24}>
              <div className="flex gap-2">
                <Form.Item name="gradeFFrom" rules={[{ required: true }]}>
                  <InputNumber disabled placeholder="from" />
                </Form.Item>

                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.gradePFrom !== currentValues.gradePFrom
                  }
                >
                  {({ getFieldValue }) => (
                    <Form.Item name="gradeFTo" rules={[{ required: true }]}>
                      <InputNumber
                        max={getFieldValue("gradePFrom") - 1}
                        placeholder="to"
                      />
                    </Form.Item>
                  )}
                </Form.Item>

                <Form.Item name="gradeFRemark">
                  <Input placeholder="remark" />
                </Form.Item>
              </div>
            </Col>
          </Row>

          <Form.Item label="">
            <Button htmlType="submit">Save Policy</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateGradingPolicyForm;
