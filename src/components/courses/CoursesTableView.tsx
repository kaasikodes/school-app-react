import { Button, Drawer, Dropdown, Menu, Space, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import { TCourse } from "../../appTypes/courses";
import EditCourseForm from "./EditCourseForm";
import ViewCourse from "./ViewCourse";

interface IProps {
  courses: TCourse[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TCourse>["onChange"];
}

enum EAction {
  EDIT = "Edit Course",
  VIEW = "View Course",
  NONE = "",
}

const CourseTableView = ({
  courses,
  loading,
  pagination,
  onChange,
}: IProps) => {
  const [showD, setShowD] = useState(false);
  const [action, setAction] = useState<EAction>(EAction.NONE);
  const [classId, setClassId] = useState("");

  const handleAction = (props: { action: EAction; classId: string }) => {
    setClassId(props.classId);
    setAction(props.action);
    setShowD(true);
    console.log("cAST", props);
  };

  const handleClose = () => {
    setClassId("");
    setAction(EAction.NONE);
    setShowD(false);
  };

  const columns: ColumnsType<TCourse> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: (
        <span title="The number of classes the course is taught in">
          {" "}
          Class Count
        </span>
      ),
      dataIndex: "levelCount",
      key: "levelCount",
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
                      classId: `${record.id}`,
                    }),
                },
                {
                  key: "2",
                  label: <span className="w-full text-left">View</span>,
                  onClick: () =>
                    handleAction({
                      action: EAction.VIEW,
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
        dataSource={courses}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />

      <Drawer open={showD} title={action} onClose={handleClose}>
        {action === EAction.EDIT && (
          <EditCourseForm id={classId} closeDrawer={handleClose} />
        )}
        {action === EAction.VIEW && (
          <ViewCourse id={classId} closeDrawer={handleClose} />
        )}
      </Drawer>
    </div>
  );
};

export default CourseTableView;
