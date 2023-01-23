import { Tabs } from "antd";
import React from "react";
import AddBulkCustodianToStudent from "./AddBulkCustodianToStudent";
import AssignSingleCustodianToStudent from "./AssignSingleCustodianToStudent";

interface IProps {
  handleClose: Function;
  studentId: string;
}

const AssignStudentCustodian = ({ handleClose, studentId }: IProps) => {
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Single" key={"single"}>
          <AssignSingleCustodianToStudent
            handleClose={handleClose}
            studentId={studentId}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bulk" key={"bulk"}>
          <AddBulkCustodianToStudent
            handleClose={handleClose}
            studentId={studentId}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default AssignStudentCustodian;
