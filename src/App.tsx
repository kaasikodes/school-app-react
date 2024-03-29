import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "react-auth-kit";
import { RequireAuth } from "react-auth-kit";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Schools from "./pages/Schools";
import Departments from "./pages/Departments";
import { routes } from "./routes";
import Courses from "./pages/Courses";
import Classes from "./pages/classes/Classes";
import Staff from "./pages/staff/Staff";
import Sessions from "./pages/Sessions";
import Custodians from "./pages/custodians/Custodians";
import Assessments from "./pages/Assessments";
import Students from "./pages/Students/Students";
import SingleClassCourse from "./pages/classes/singleClass/courses/SingleClassCourse";
import ClassCourses from "./pages/classes/singleClass/courses/ClassCourses";
import SingleStaff from "./pages/staff/SingleStaff";
import Policies from "./pages/policies/Policies";
import Payments from "./pages/Payments";
import AssignSessionCoursesToStudent from "./pages/Students/AssignSessionCoursesToStudent";
import AssignSessionCoursesToStaff from "./pages/staff/AssignSessionCoursesToStaff";
import StaffClassCourses from "./pages/staff/StaffClassCourses";
import SingleStudent from "./pages/Students/SingleStudent";
import RegisterSchool from "./pages/RegisterSchool";
import UserProfile from "./pages/UserProfile";
import GlobalContextProvider from "./contexts/GlobalContextProvider";
import Settings from "./pages/Settings";
import SingleStudentCourse from "./pages/Students/SingleStudentCourse";
import SingleStudentClassPage from "./pages/Students/SingleStudentClassPage";
import SingleStudentSessionResultPage from "./pages/Students/SingleStudentSessionResultPage";
import Events from "./pages/Events";
import Approvals from "./pages/Approvals";
import Requisitions from "./pages/Requisitions";
import AcademicRecords from "./pages/AcademicRecords";
import SingleCustodian from "./pages/custodians/SingleCustodian";
import ComingSoon from "./components/general/ComingSoon";
import InviteUsers from "./pages/InviteUsers";
import Notifications from "pages/Notifications";
import NotFound from "pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider
      authType={"localstorage"}
      authName={"school_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
    >
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <Router>
            <Routes>
              <Route path={routes.login} element={<Login />} />
              <Route
                path={routes.registerSchool}
                element={<RegisterSchool />}
              />
              <Route
                path="/"
                element={
                  <RequireAuth loginPath={routes.login}>
                    <Root />
                  </RequireAuth>
                }
              >
                <Route index element={<UserProfile />} />
                <Route path={routes.schools} element={<Schools />} />
                <Route path={routes.departments} element={<Departments />} />
                <Route path={routes.courses} element={<Courses />} />
                <Route path={routes.classes} element={<Classes />} />
                <Route path={routes.staff} element={<Staff />} />
                <Route path={routes.singleStaff} element={<SingleStaff />} />
                {/* custodianId */}
                <Route
                  path={routes.singleCustodian}
                  element={<SingleCustodian />}
                />
                {/* student */}
                <Route
                  path={routes.singleStudent}
                  element={<SingleStudent />}
                />
                <Route
                  path={routes.singleStudentCourseParticipantRecord}
                  element={<SingleStudentCourse />}
                />
                <Route
                  path={routes.singleStudentSingleClassOverview}
                  element={<SingleStudentClassPage />}
                />
                <Route
                  path={routes.singleStudentSingleSessionResult}
                  element={<SingleStudentSessionResultPage />}
                />
                <Route path={routes.sessions} element={<Sessions />} />
                <Route path={routes.assessments} element={<Assessments />} />
                <Route path={routes.custodians} element={<Custodians />} />
                <Route path={routes.policies} element={<Policies />} />
                <Route path={routes.payments} element={<Payments />} />
                <Route path={routes.events} element={<Events />} />
                <Route path={routes.approvals} element={<Approvals />} />
                <Route path={routes.requisitions} element={<Requisitions />} />
                <Route
                  path={routes.academicRecords}
                  element={<AcademicRecords />}
                />

                {/* /students/${record.id}/assign-course */}
                <Route path={routes.students} element={<Students />} />
                <Route
                  path={routes.assignSessionCoursesToStudent}
                  element={<AssignSessionCoursesToStudent />}
                />

                {/* staff */}
                <Route
                  path={routes.assignSessionCoursesToStaff}
                  element={<AssignSessionCoursesToStaff />}
                />

                {/* classes */}
                <Route path={routes.singleClass} element={<ClassCourses />} />
                <Route
                  path={routes.singleStaffClass}
                  element={<StaffClassCourses />}
                />
                <Route
                  path={routes.singleClassCourse}
                  element={<SingleClassCourse />}
                />

                {/* reports */}
                <Route path={routes.reports} element={<ComingSoon />} />
                {/* Announcements */}
                <Route path={routes.announcements} element={<ComingSoon />} />

                {/* settings */}
                <Route path={routes.settings} element={<Settings />} />
                {/* invites */}
                <Route path={routes.inviteUsers} element={<InviteUsers />} />
                {/* notifications */}
                <Route
                  path={routes.notifications}
                  element={<Notifications />}
                />
              </Route>
              {/* not found */}
              <Route path={routes.notFound} element={<NotFound />} />
            </Routes>
          </Router>
        </GlobalContextProvider>

        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
