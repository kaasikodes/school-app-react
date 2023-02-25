import { Typography, Drawer, Tabs } from "antd";
import { useState } from "react";
import AddStaffForm from "../staff/AddStaffForm";
import AssessmentTemplateContainer from "./AssessmentTemplateContainer";
import CourseEnrollmentPolicyContainer from "./CourseEnrollmentPolicyContainer";
import GradingPolicyContainer from "./GradingPolicyContainer";
import StudentEnrollmentPolicyContainer from "./StudentEnrollmentPolicyContainer";
import StudentPromotionPolicyContainer from "./StudentPromotionPolicyContainer";

const PoliciesWrapper = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Typography.Title level={3}>Policies & Templates</Typography.Title>
      <div className=" mt-4 ">
        <Tabs>
          <Tabs.TabPane tab="Student Enrollment" key="item-1">
            <StudentEnrollmentPolicyContainer />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Course Enrollment" key="item-2">
            <CourseEnrollmentPolicyContainer />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Grading" key="item-3">
            <GradingPolicyContainer />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Student Promotion" key="item-4">
            <StudentPromotionPolicyContainer />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Assessment Template" key="item-5">
            <AssessmentTemplateContainer />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <div className="mt-8 flex flex-col gap-2"></div>

      <Drawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        title="Add Staff"
      >
        <AddStaffForm closeDrawer={() => setShowDrawer(false)} />
      </Drawer>
    </div>
  );
};

export default PoliciesWrapper;
