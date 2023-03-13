import { Tabs } from "antd";
import AddBulkDepartmentsForm from "./AddBulkDepartmentsForm";
import AddSingleDepartmentForm from "./AddSingleDepartmentForm";

interface IProps {
  closeDrawer: Function;
}

const AddDepartment = ({ closeDrawer }: IProps) => {
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Single" key={"single"}>
          <AddSingleDepartmentForm closeDrawer={closeDrawer} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bulk" key={"bulk"}>
          <AddBulkDepartmentsForm closeDrawer={closeDrawer} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default AddDepartment;
