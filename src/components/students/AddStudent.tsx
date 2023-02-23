import { Tabs } from "antd";
import React from "react";
import AddBulkStudentForm from "./AddBulkStudentForm";
import AddSingleStudentForm from "./AddSingleStudentForm";

interface IProps {
  closeDrawer: Function;
}

const AddStudent = ({ closeDrawer }: IProps) => {
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Single" key={"single"}>
          {/* <AddSingleStudentForm closeDrawer={closeDrawer} /> */}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bulk" key={"bulk"}>
          {/* <AddBulkStudentForm closeDrawer={closeDrawer} /> */}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default AddStudent;
