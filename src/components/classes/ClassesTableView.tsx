import { Button, Drawer, Dropdown, Menu, Space, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import { TLevel } from "../../appTypes/levels";
import EditClassForm from "./EditClassForm";
import ViewClass from "./ViewClass";

interface IProps {
  classes: TLevel[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TLevel>["onChange"];
}

type TAction = "Edit Class" | "View Class" | "";

const ClassesTableView = ({
  classes,
  loading,
  pagination,
  onChange,
}: IProps) => {
  const [showD, setShowD] = useState(false);
  const [action, setAction] = useState<TAction>("");
  const [classId, setClassId] = useState("");

  const handleAction = (props: { action: TAction; classId: string }) => {
    setClassId(props.classId);
    setAction(props.action);
    setShowD(true);
  };

  const handleClose = () => {
    setClassId("");
    setAction("");
    setShowD(false);
  };

  // DB: Class Name is now unique in each school

  const columns: ColumnsType<TLevel> = [
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
      title: "Session Class Teacher",
      dataIndex: "teacher",
      key: "teacher",
      render: (val, item) => <span>{item?.classTeacher?.name}</span>,
    },
    // {
    //   title: "Author",
    //   dataIndex: "author",
    //   key: "author",
    //   render: (author) => <span className="capitalize">{author?.name}</span>,
    // },
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
                      action: "Edit Class",
                      classId: `${record.id}`,
                    }),
                },
                {
                  key: "2",
                  label: <span className="w-full text-left">View</span>,
                  onClick: () =>
                    handleAction({
                      action: "View Class",
                      classId: `${record.id}`,
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
        dataSource={classes}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />

      <Drawer open={showD} title={action} onClose={handleClose}>
        {action === "Edit Class" && (
          <EditClassForm id={classId} closeDrawer={handleClose} />
        )}
        {action === "View Class" && (
          <ViewClass id={classId} closeDrawer={handleClose} />
        )}
      </Drawer>
    </div>
  );
};

export default ClassesTableView;
