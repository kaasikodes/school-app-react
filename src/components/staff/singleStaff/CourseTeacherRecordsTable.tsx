import { Button, Dropdown, Menu, Modal, Space, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import { TStaffCourseTeacherRecord } from "../../../appTypes/staff";
import { Link } from "react-router-dom";

interface IProps {
  records: TStaffCourseTeacherRecord[];
  classId: string;
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TStaffCourseTeacherRecord>["onChange"];
}

enum EAction {
  ALLOW_STAFF_TO_RECORD = "Allow Staff to record",
  NONE = "",
}

const CourseTeacherRecordsTable = ({
  records,
  loading,
  pagination,
  onChange,
  classId,
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

  const columns: ColumnsType<TStaffCourseTeacherRecord> = [
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      render: (course) => (
        <Link to={`/classes/${classId}/courses/${course.id}`}>
          {course.name}
        </Link>
      ),
    },
    {
      title: "Can Record Assessment",
      dataIndex: "canRecord",
      key: "canRecord",
      render: (val) => (val === 1 ? "Yes" : "No"),
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
                  label: (
                    <span className="w-full text-left">
                      Allow Staff to record
                    </span>
                  ),
                  onClick: () =>
                    handleAction({
                      action: EAction.ALLOW_STAFF_TO_RECORD,
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
        scroll={{ x: "max-content" }}
        dataSource={records}
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />

      <Modal open={showD} title={action} onCancel={handleClose}>
        {action === EAction.ALLOW_STAFF_TO_RECORD}
      </Modal>
    </div>
  );
};

export default CourseTeacherRecordsTable;
