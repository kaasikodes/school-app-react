import {
  Input,
  Button,
  Form,
  Spin,
  Select,
  DatePicker,
  InputNumber,
  Switch,
} from "antd";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { genders } from "../../data";
import { loginUser } from "../../helpers/auth";
import { addEstate, IAddProps } from "../../helpers/estate";
import {
  addEstateOwner,
  getEstateOwners,
  ICreateProps,
} from "../../helpers/estateOwners";
import { openNotification } from "../utils/notifcations";

const AddStaff = () => {
  const { mutate } = useMutation(addEstate);
  const handleSubmit = async (props: any) => {
    const data: IAddProps = {
      ...props,
      nextRenewalDate: props.nextRenewalDate?.format("YYYY-MM-DD"),
    };
    console.log("result", data);
    // return;
    openNotification({
      state: "info",
      title: "Wait a minute ...",
      description: <Spin />,
    });
    mutate(
      { ...data },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res) => {
          const result = res.data.data;

          openNotification({
            state: "success",

            title: "Success",
            description: "The estate was created successfully",
            // duration: 0.4,
          });
        },
      }
    );
  };
  const {
    data: owners,
    isError,
    isFetching,
    isSuccess,
  } = useQuery(
    "estate-owners",
    () => getEstateOwners({ limit: "10", offset: "0" }),
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
      select: (res) => {
        const result = res.data.data;
        // openNotification({
        //   state: "success",

        //   title: "Success",
        //   description: "Estate Owners Fetched !",
        //   // duration: 0.4,
        // });
        return result.result;
      },
    }
  );
  return (
    <Form labelCol={{ span: 24 }} onFinish={handleSubmit}>
      <Form.Item name={"estateOwnerId"}>
        <Select placeholder="Estate Owner">
          {isSuccess &&
            owners.map((item: any) => (
              <Select.Option key={item["_id"]} value={item["_id"]}>
                <span>
                  {item.firstName} {item.lastName}
                </span>
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name={"name"}>
        <Input placeholder="name" />
      </Form.Item>
      <Form.Item name={"accountNumber"}>
        <Input placeholder="account Number" />
      </Form.Item>
      <Form.Item name={"bankCode"}>
        <Input placeholder="bank Code" />
      </Form.Item>

      <Form.Item name={"dependantFee"}>
        <InputNumber placeholder="dependant Fee" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item name={"primaryResidentFee"}>
        <InputNumber
          placeholder="primary Resident Fee"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item name={"nextRenewalDate"}>
        <DatePicker placeholder="next Renewal Date" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item name={"location"}>
        <Input.TextArea placeholder="location" />
      </Form.Item>

      <Form.Item name={"description"}>
        <Input.TextArea placeholder="description" />
      </Form.Item>
      <Form.Item
        name={"addGatePassApproval"}
        label="Do you want to add GatePassApproval?"
      >
        <Switch unCheckedChildren="No" checkedChildren="yes" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" className="w-full" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddStaff;
