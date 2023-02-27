import { Tabs } from "antd";
import AddBulkClassesForm from "./AddBulkClassesForm";
import AddSingleClassForm from "./AddSingleClassForm";

interface IProps {
  closeDrawer: Function;
}

const AddClass = ({ closeDrawer }: IProps) => {
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Single" key={"single"}>
          <AddSingleClassForm closeDrawer={closeDrawer} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bulk" key={"bulk"}>
          <AddBulkClassesForm closeDrawer={closeDrawer} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default AddClass;
