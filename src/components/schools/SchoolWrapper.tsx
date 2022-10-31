import {
  Button,
  Drawer,
  Pagination,
  PaginationProps,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";

import { IAuthDets } from "../../appTypes/auth";
import { ERole } from "../../appTypes/roles";
import { openNotification } from "../../helpers/notifications";
import { getSchools } from "../../helpers/schools";
import { retrieveUser } from "../../helpers/users";
import ComponentLoader from "../loaders/ComponentLoader";
import AddSchoolForm from "./AddSchoolForm";
import { ISchoolCardEntry } from "./SchoolCard";
import SchoolCards from "./SchoolCards";

const SchoolWrapper = () => {
  const [showAddSchoolForm, setShowAddSchoolForm] = useState(false);
  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;

  const choosenSchoolId = authDetails.choosenSchoolId;
  const userCurrentRole = authDetails.currentUserRoleInChoosenSchool;
  const [currentPage, setCurrentPage] = useState(1);

  const [schools, setSchools] = useState<ISchoolCardEntry[]>([]);
  const [schoolCount, setSchoolCount] = useState(0);
  const [limit, setLimit] = useState(3);
  useEffect(() => {
    const fetchedSchools: ISchoolCardEntry[] = authDetails.schools.map(
      (school): ISchoolCardEntry => ({
        item: { name: school.name, id: school.id },
        selected: false,
      })
    );
    setCurrentPage(1);
    setSchools(fetchedSchools);
    setSchoolCount(fetchedSchools.length);
  }, [authDetails]);

  const onChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <div>
      <Typography.Title level={3}>
        <span className="text-cyan-900">Schools</span>
      </Typography.Title>
      {/* actions */}
      {userCurrentRole === ERole.ADMIN && (
        <div className="py-2 rounded-sm flex justify-end mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddSchoolForm(true)}
              className="bg-green-700 px-2 py-2 text-xs text-white rounded-sm hover:bg-green-600 transition-all duration-300"
            >
              + Add School
            </button>
          </div>
        </div>
      )}
      {/* add school form */}
      <Drawer
        visible={showAddSchoolForm}
        onClose={() => setShowAddSchoolForm(false)}
        title="Add School"
      >
        <AddSchoolForm closeDrawer={() => setShowAddSchoolForm(false)} />
      </Drawer>

      <div className="flex flex-col gap-3">
        <SchoolCards
          schools={schools}
          current={currentPage}
          onChange={onChange}
          total={schoolCount}
          pageSize={limit}
          choosenSchoolId={choosenSchoolId}
        />
      </div>
    </div>
  );
};

export default SchoolWrapper;
