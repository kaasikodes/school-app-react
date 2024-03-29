import { Button, Drawer, Dropdown, Menu, Space, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import { TStaff } from "../../appTypes/staff";
import ViewStaff from "./ViewStaff";
import EditStaffForm from "./EditStaffForm";
import { routes } from "../../routes";
import { Link } from "react-router-dom";

interface IProps {
  staff: TStaff[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TStaff>["onChange"];
}

enum EAction {
  EDIT = "Edit Staff",
  VIEW = "View Staff",
  NONE = "",
}

const StaffTableView = ({ staff, loading, pagination, onChange }: IProps) => {
  const [showD, setShowD] = useState(false);
  const [action, setAction] = useState<EAction>(EAction.NONE);
  const [staffId, setStaffId] = useState("");

  const handleAction = (props: { action: EAction; staffId: string }) => {
    setStaffId(props.staffId);
    setAction(props.action);
    setShowD(true);
    console.log("cAST", props);
  };

  const handleClose = () => {
    setStaffId("");
    setAction(EAction.NONE);
    setShowD(false);
  };

  const columns: ColumnsType<TStaff> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Link to={`${routes.staff}/${record.id}`}>{record.name}</Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: (
        <span title="The number of classes the course is taught in">
          {" "}
          Class Count
        </span>
      ),
      dataIndex: "sessionLevelCount",
      key: "sessionLevelCount",
      render: (_, item) => <span>{item.sessionLevelCount}</span>,
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  key: "1",
                  label: <span className="w-full text-left">Edit</span>,
                  onClick: () =>
                    handleAction({
                      action: EAction.EDIT,
                      staffId: `${record.id}`,
                    }),
                },
                {
                  key: "2",
                  label: <span className="w-full text-left">View</span>,
                  onClick: () =>
                    handleAction({
                      action: EAction.VIEW,
                      staffId: `${record.id}`,
                    }),
                },
              ]}
            />
          }
          trigger={["click"]}
        >
          <Space>
            <Button icon={<EllipsisOutlined />} type="text" />
          </Space>
        </Dropdown>
      ),
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        size="small"
        scroll={{ x: "max-content" }}
        dataSource={staff}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />
      <Drawer open={showD} title={action} onClose={handleClose}>
        {action === EAction.EDIT && (
          <EditStaffForm id={staffId} closeDrawer={handleClose} />
        )}
        {action === EAction.VIEW && (
          <ViewStaff id={staffId} closeDrawer={handleClose} />
        )}
      </Drawer>
    </div>
  );
};

export default StaffTableView;
