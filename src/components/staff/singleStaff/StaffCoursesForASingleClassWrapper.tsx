import { Typography, Input, Button, Drawer, Breadcrumb } from "antd";

import { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import { IAuthDets } from "../../../appTypes/auth";
import { GlobalContext } from "../../../contexts/GlobalContextProvider";
import { useFetchSingleClass } from "../../../helpersAPIHooks/classes";
import { useFetchSingleStaff } from "../../../helpersAPIHooks/staff";
import ComponentLoader from "../../loaders/ComponentLoader";
import AddSchoolCourse from "../../settings/courses/AddSchoolCourse";
import CourseTeacherRecordsContainer from "./CourseTeacherRecordsContainer";

interface IProps {
  classId?: string;
  staffId?: string;
}
const StaffCoursesForASingleClassWrapper = ({ classId, staffId }: IProps) => {
  // suppose to fetch the course teacher record belonging to a staff
  const [showDrawer, setShowDrawer] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const user = authDetails.user;
  const token = authDetails.userToken;

  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const schoolId = globalState?.currentSchool?.id as string;
  const userStaffId = globalState?.currentSchool?.staffId as unknown as string;

  const { isSuccess, data: classData } = useFetchSingleClass({
    id: classId as string,
    schoolId,
    token,
  });
  const { isSuccess: isStfSuccess, data: staffData } = useFetchSingleStaff({
    id: staffId as string,
    schoolId,
    token,
  });
  if (!isSuccess || !isStfSuccess) {
    return <ComponentLoader />;
  }

  return (
    <div>
      <div className="flex flex-col justify-between">
        {userStaffId.toString() === staffId?.toString() ? (
          <Typography.Title level={3}>
            My {classData?.name} Courses
          </Typography.Title>
        ) : (
          <Typography.Title level={3}>
            {classData?.name} Courses for {staffData?.name}
          </Typography.Title>
        )}

        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={`/`}>Home</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <span>Courses</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className=" mt-4 flex md:justify-end">
        <div className="flex gap-4">
          <Input.Search
            placeholder="Search courses"
            onSearch={(val) => setSearchTerm(val)}
            allowClear
            onChange={(e) => e.target.value === "" && setSearchTerm("")}
          />
          <Button onClick={() => setShowDrawer(true)} type="primary">
            Assign Course to Staff
          </Button>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <CourseTeacherRecordsContainer
          staffId={staffId as string}
          classId={classId as string}
          searchTerm={searchTerm}
        />
      </div>

      <Drawer
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
        title="Add Course"
      >
        <AddSchoolCourse handleClose={() => setShowDrawer(false)} />
      </Drawer>
    </div>
  );
};

export default StaffCoursesForASingleClassWrapper;
