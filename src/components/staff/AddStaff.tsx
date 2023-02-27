import { Tabs } from "antd";
import AddBulkStaffForm from "./AddBulkStaffForm";
import AddSingleStaffForm from "./AddSingleStaffForm";

interface IProps {
  closeDrawer: Function;
}

const AddStaff = ({ closeDrawer }: IProps) => {
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Single" key={"single"}>
          <AddSingleStaffForm closeDrawer={closeDrawer} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bulk" key={"bulk"}>
          <AddBulkStaffForm closeDrawer={closeDrawer} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default AddStaff;
