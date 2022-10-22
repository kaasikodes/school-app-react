import { Table } from "antd";
import moment from "moment";
import React from "react";
import { useQuery } from "react-query";
import { getEstates } from "../../helpers/estate";
import { getEstateOwners } from "../../helpers/estateOwners";
import { openNotification } from "../utils/notifcations";
import type { ColumnsType, TableProps } from "antd/es/table";
import { getOneEstateStaff } from "../../helpers/staff";

interface IProps {
  estateId: string;
}

const StaffTable = ({ estateId }: IProps) => {
  const { data, isError, isFetching, isSuccess } = useQuery(
    ["staff", estateId],
    () =>
      getOneEstateStaff({
        pagProps: { limit: "10", offset: "0" },
        estateId: estateId,
      }),
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
        console.log(res, result, "rerere");

        return result.result;
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

        return result.result;
      },
    }
  );
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (value: any, record: any) =>
        `${record.estate[0].firstName} ${record.estate[0].lastName}`,
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
      render: (value: any, record: any) => `${record.estate[0].phoneNumber}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,

      render: (value: any, record: any) => `${record.estate[0].email} `,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
      render: (value: any, record: any) => `${record.estate[0].homeAddress}`,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (value: any, record: any) => `${record.estate[0].role}`,
    },
  ];

  return (
    <div>
      <Table dataSource={data} loading={isFetching} columns={columns} />
    </div>
  );
};

export default StaffTable;
