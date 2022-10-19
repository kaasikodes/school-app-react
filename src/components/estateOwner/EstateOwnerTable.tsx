import { Table } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { getEstateOwners } from "../../helpers/estateOwners";
import { openNotification } from "../utils/notifcations";

const EstateOwnerTable = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Archived",
      dataIndex: "isArchived",
      key: "isArchived",
      render: (_: any, record: any) => `${record.isArchived ? "Yes" : "No"} `,
    },
  ];
  const { data, isError, isFetching, isSuccess } = useQuery(
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
    <div>
      <Table dataSource={data} loading={isFetching} columns={columns} />
    </div>
  );
};

export default EstateOwnerTable;
