import { Button, Drawer, Dropdown, Menu, Space, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { TDepartment } from "../../appTypes/departments";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditDepartmentForm from "./EditDepartmentForm";
import ViewDepartmentForm from "./ViewDepartment";

interface IProps {
  departments: TDepartment[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TDepartment>["onChange"];
}

enum EAction {
  EDIT = "Edit Deparment",
  VIEW = "View Department",
  NONE = "",
}
// Dept unique name in school added in :DB
const DepartmentsTableView = ({
  departments,
  loading,
  pagination,
  onChange,
}: IProps) => {
  const [showD, setShowD] = useState(false);
  const [action, setAction] = useState<EAction>(EAction.NONE);
  const [departmentId, setDepartmentId] = useState("");

  const handleAction = (props: { action: EAction; departmentId: string }) => {
    setDepartmentId(props.departmentId);
    setAction(props.action);
    setShowD(true);
    console.log("cAST", props);
  };

  const handleClose = () => {
    setDepartmentId("");
    setAction(EAction.NONE);
    setShowD(false);
  };

  const columns: ColumnsType<TDepartment> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "No of Courses",
      dataIndex: "courseCount",
      key: "courseCount",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (author) => <span className="capitalize">{author?.name}</span>,
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
                      departmentId: `${record.id}`,
                    }),
                },
                {
                  key: "2",
                  label: <span className="w-full text-left">View</span>,
                  onClick: () =>
                    handleAction({
                      action: EAction.VIEW,
                      departmentId: `${record.id}`,
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
        dataSource={departments}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />

      <Drawer open={showD} title={action} onClose={handleClose}>
        {action === EAction.EDIT && (
          <EditDepartmentForm id={departmentId} closeDrawer={handleClose} />
        )}
        {action === EAction.VIEW && (
          <ViewDepartmentForm id={departmentId} closeDrawer={handleClose} />
        )}
      </Drawer>
    </div>
  );
};

export default DepartmentsTableView;
