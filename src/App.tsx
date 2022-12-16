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
import Custodians from "./pages/Custodians";
import Assessments from "./pages/Assessments";
import Students from "./pages/Students/Students";
import SingleClassCourse from "./pages/classes/singleClass/courses/SingleClassCourse";
import ClassCourses from "./pages/classes/singleClass/courses/ClassCourses";
import SingleStaff from "./pages/staff/SingleStaff";
import Policies from "./pages/policies/Policies";
import Payments from "./pages/Payments";
import AssignSessionCoursesToStudent from "./pages/Students/AssignSessionCoursesToStudent";
import AssignSessionCoursesToStaff from "./pages/staff/AssignSessionCoursesToStaff";
import StaffClassCourses from "./pages/classes/singleClass/courses/StaffClassCourses";
import SingleStudent from "./pages/Students/SingleStudent";

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
        <Router>
          <Routes>
            <Route path={routes.login} element={<Login />} />
            <Route
              path="/"
              element={
                <RequireAuth loginPath={routes.login}>
                  <Root />
                </RequireAuth>
              }
            >
              <Route index element={<div>ok</div>} />
              {/* <Route path={routes.schools} element={<Schools />} /> */}
              <Route path={routes.departments} element={<Departments />} />
              <Route path={routes.courses} element={<Courses />} />
              <Route path={routes.classes} element={<Classes />} />
              <Route path={routes.staff} element={<Staff />} />
              <Route path={routes.singleStaff} element={<SingleStaff />} />
              <Route path={routes.singleStudent} element={<SingleStudent />} />
              <Route path={routes.sessions} element={<Sessions />} />
              <Route path={routes.assessments} element={<Assessments />} />
              <Route path={routes.custodians} element={<Custodians />} />
              <Route path={routes.policies} element={<Policies />} />
              <Route path={routes.payments} element={<Payments />} />

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
            </Route>
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
