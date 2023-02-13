import { Button, Drawer, Dropdown, Menu, Space, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import { TCourse } from "../../appTypes/courses";
import EditCourseForm from "./EditCourseForm";
import ViewCourse from "./ViewCourse";
import AssignCourseTeacher from "./AssignCourseTeacher";

interface IProps {
  courses: TCourse[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TCourse>["onChange"];
}

enum EAction {
  EDIT = "Edit Course",
  VIEW = "View Course",
  ASSIGN_STAFF_TO_TEACH_COURSE = "Assign Staff to teach course",
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
  const [courseId, setCourseId] = useState("");

  const handleAction = (props: { action: EAction; courseId: string }) => {
    setCourseId(props.courseId);
    setAction(props.action);
    setShowD(true);
    console.log("cAST", props);
  };

  const handleClose = () => {
    setCourseId("");
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
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (_, item) => (
        <span className="capitalize">{item?.department?.name}</span>
      ),
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
                      courseId: `${record.id}`,
                    }),
                },
                {
                  key: "2",
                  label: <span className="w-full text-left">View</span>,
                  onClick: () =>
                    handleAction({
                      action: EAction.VIEW,
                      courseId: `${record.id}`,
                    }),
                },
                {
                  key: "3",
                  label: (
                    <span className="w-full text-left">
                      {EAction.ASSIGN_STAFF_TO_TEACH_COURSE}
                    </span>
                  ),
                  onClick: () =>
                    handleAction({
                      action: EAction.ASSIGN_STAFF_TO_TEACH_COURSE,
                      courseId: `${record.id}`,
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
          <EditCourseForm id={courseId} closeDrawer={handleClose} />
        )}
        {action === EAction.VIEW && (
          <ViewCourse id={courseId} closeDrawer={handleClose} />
        )}
        {action === EAction.ASSIGN_STAFF_TO_TEACH_COURSE && (
          <AssignCourseTeacher id={courseId} closeDrawer={handleClose} />
        )}
      </Drawer>
    </div>
  );
};

export default CourseTableView;
