import { Table } from "antd";
import moment from "moment";
import React from "react";
import { useQuery } from "react-query";
import { getEstates } from "../../helpers/estate";
import { getEstateOwners } from "../../helpers/estateOwners";
import { openNotification } from "../utils/notifcations";
import type { ColumnsType, TableProps } from "antd/es/table";

interface DataType {
  key: React.Key;
  location: string;
  ownerId: string;
  address: string;
  ownerPhone: string;
  nextRenewalDate: string;
}

const EstateTable = () => {
  const { data, isError, isFetching, isSuccess } = useQuery(
    "estates",
    () => getEstates({ limit: "10", offset: "0" }),
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
        const ans = result.result.map((item: any) => ({
          ownerId: item.estateOwnerId["_id"],
          key: item["_id"],
          location: item.location,

          address: item.address,
          ownerPhone: "rere",
          nextRenewalDate: item.nextRenewalDate,
          ...item,
        }));
        console.log(ans, "ytt");
        return ans;
      },
    }
  );
  const {
    data: owners,

    isSuccess: oIsSuccess,
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
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Address",
      dataIndex: "location",
      key: "location",
      ellipsis: true,
    },
    {
      title: "Owner Name",
      dataIndex: "ownerId",
      key: "ownerId",
      filters: oIsSuccess
        ? owners.map((item: any) => ({
            text: `${item.firstName} ${item.lastName}`,
            value: item["_id"],
          }))
        : [],
      onFilter: (value: any, record) => record.ownerId.indexOf(value) !== -1,
      render: (value: any, record: any) =>
        `${record.estateOwnerId.firstName} ${record.estateOwnerId.lastName}`,
    },
    {
      title: "Next Renewal Date",
      dataIndex: "nextRenewalDate",
      key: "nextRenewalDate",
      render: (value: any, record: any) =>
        `${moment(record.nextRenewalDate).format("YYYY-MM-DD")}`,
    },
    {
      title: "Owner Phone",
      dataIndex: "ownerPhone",
      key: "ownerPhone",
      render: (value: any, record: any) =>
        `${record.estateOwnerId.phoneNumber}`,
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <Table
        dataSource={data}
        loading={isFetching}
        columns={columns}
        onChange={onChange}
      />
    </div>
  );
};

export default EstateTable;
