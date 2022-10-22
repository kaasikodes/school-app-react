import { Drawer, Dropdown, Menu, Space, Table } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { getEstateOwners } from "../../helpers/estateOwners";
import { openNotification } from "../utils/notifcations";
import { MoreOutlined } from "@ant-design/icons";
import EditEstateOwner from "./EditEstateOwner";

enum EAction {
  NO_COMP = "",
  EDIT = "Edit Estate Owner Details",
}

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
    // {
    //   title: "Archived",
    //   dataIndex: "isArchived",
    //   key: "isArchived",
    //   render: (_: any, record: any) => `${record.isArchived ? "Yes" : "No"} `,
    // },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (val: string, item: any) => (
        <Space align="center" className="cursor-pointer">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="3"
                  onClick={() =>
                    handleComp({ id: item["_id"], action: EAction.EDIT })
                  }
                >
                  Edit
                </Menu.Item>
              </Menu>
            }
            trigger={["click", "hover"]}
          >
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
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
  const [showD, setShowD] = useState(false);
  const [action, setAction] = useState<EAction>(EAction.NO_COMP);
  const [id, setId] = useState("");
  const handleComp = ({ id, action }: { id: string; action: EAction }) => {
    setAction(action);
    setId(id);
    setShowD(true);
  };
  return (
    <div>
      <Drawer visible={showD} onClose={() => setShowD(false)} title={action}>
        {action === EAction.EDIT && <EditEstateOwner id={id} />}
      </Drawer>
      <Table dataSource={data} loading={isFetching} columns={columns} />
    </div>
  );
};

export default EstateOwnerTable;
