import { Tabs } from "antd";
import React from "react";
import AddBulkCoursesForm from "./AddBulkCoursesForm";
import AddSingleCourseForm from "./AddSingleCourseForm";

interface IProps {
  closeDrawer: Function;
}

const AddCourse = ({ closeDrawer }: IProps) => {
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Single" key={"single"}>
          <AddSingleCourseForm closeDrawer={closeDrawer} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bulk" key={"bulk"}>
          <AddBulkCoursesForm closeDrawer={closeDrawer} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default AddCourse;
