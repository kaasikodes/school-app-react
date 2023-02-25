import { Button, Drawer, Dropdown, Menu, Space, Table } from "antd";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/lib/table";
import { TDepartment } from "../../appTypes/departments";
import { EllipsisOutlined, LoadingOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import EditDepartmentForm from "./EditDepartmentForm";
import ViewDepartmentForm from "./ViewDepartment";
import { useDeleteSingleDepartment } from "../../helpersAPIHooks/departments";
import { useAuthUser } from "react-auth-kit";
import { IAuthDets } from "../../appTypes/auth";
import { GlobalContext } from "../../contexts/GlobalContextProvider";
import { useQueryClient } from "react-query";
import { openNotification } from "../../helpers/notifications";

interface IProps {
  departments: TDepartment[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange?: TableProps<TDepartment>["onChange"];
}

enum EAction {
  EDIT = "Edit Deparment",
  VIEW = "View Department",
  DELETE = "Delete Department",
  NONE = "",
}
// Dept unique name in school added in :DB
const DepartmentsTableView = ({
  departments,
  loading,
  pagination,
  onChange,
}: IProps) => {
  const queryClient = useQueryClient();
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const adminId = globalState?.currentSchool?.adminId as string;
  const [showD, setShowD] = useState(false);
  const [action, setAction] = useState<EAction>(EAction.NONE);
  const [departmentId, setDepartmentId] = useState("");
  const { mutate } = useDeleteSingleDepartment();

  const handleAction = (props: { action: EAction; departmentId: string }) => {
    if (props.action === "Delete Department") {
      const params = {
        schoolId,
        departmentId: props.departmentId,
        token,
      };
      // delete logic here
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <LoadingOutlined />,
      });
      mutate(params, {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          queryClient.invalidateQueries({
            queryKey: ["departments"],
            // exact: true,
          });
        },
      });
      return;
    }
    setDepartmentId(props.departmentId);
    setAction(props.action);
    setShowD(true);
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
                {
                  key: "3",
                  label: <span className="w-full text-left">Delete</span>,
                  onClick: () =>
                    handleAction({
                      action: EAction.DELETE,
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
