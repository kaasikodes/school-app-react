import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Switch,
  Upload,
} from "antd";
import React from "react";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import {
  createClassFee,
  getCurrencies,
  getPaymentCategories,
  ICreateClassFeeProps,
} from "../../helpers/payments";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "react-query";
import { openNotification } from "../../helpers/notifications";
import { TCurrency, TPaymentCategry } from "../../appTypes/payments";
import { getClasses } from "../../helpers/classes";
import PageLoader from "../loaders/PageLoader";

const AddClassFee = () => {
  const [form] = Form.useForm();

  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;
  const schoolId = authDetails.choosenSchoolId;
  const sessionId = "0"; //should be from ctx
  // fetch data
  // currencies
  const {
    data: currencies,

    isSuccess: isCuSuccess,
  } = useQuery(
    "currencies",
    () => getCurrencies({ schoolId: schoolId as string, token }),
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

        const data: TCurrency[] = result.map(
          (item: any): TCurrency => ({
            id: item.id,
            name: item.name,
            code: item?.code,
          })
        );

        return data;
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

  const { mutate, isLoading } = useMutation(createClassFee);

  const handleSubmit = (data: any) => {
    if (schoolId && sessionId) {
      const props: ICreateClassFeeProps = {
        levelId: data.levelId,
        sessionId,
        categoryId: data.categoryId,
        docUrl: data.docUrl,
        amount: data.amount.value,
        inPart: data.inPart,
        currencyId: data.amount.currency,
        token,
        schoolId,
      };
      console.log("prps", props, data);
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
          const result = res.data.data;

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

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <div>
      {isPCSuccess && isCuSuccess && isLSuccess ? (
        <Form
          form={form}
          requiredMark={false}
          labelCol={{ span: 24 }}
          onFinish={handleSubmit}
        >
          {/* $result = SchoolLevelFee::create(['school_id'=>$request->schoolId,'level_id'=>$request->levelId, 'school_session_id'=>$request->sessionId,'fee_category_id'=>$request->categoryId, 'breakdown_document_url' => $request->docUrl, 'amount'=>$request->amount, 'can_be_installmental' => $request->inPart]); */}
          {/* payment category and class should be unique (backend), if exits dn't create */}

          <Form.Item name="levelId" label="Class">
            <Select
              options={levels.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>

          <Form.Item name="categoryId" label="Payment Category">
            <Select
              options={paymentCategories.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>

          <Form.Item name="amount" label="Total amount to be paid">
            <Input.Group compact>
              <Form.Item noStyle name={["amount", "value"]}>
                <InputNumber />
              </Form.Item>
              <Form.Item noStyle name={["amount", "currency"]}>
                <Select
                  options={currencies.map((item) => ({
                    value: item.id,
                    label: item.code,
                  }))}
                />
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
      ) : (
        <PageLoader />
      )}
    </div>
  );
};

export default AddClassFee;
