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
import Classes from "./pages/Classes/Classes";
import Staff from "./pages/Staff";
import Sessions from "./pages/Sessions";
import Custodians from "./pages/Custodians";
import Assessments from "./pages/Assessments";
import Students from "./pages/Students";
import SingleClass from "./pages/Classes/[classId].tsx/SingleClass";

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
              <Route path={routes.schools} element={<Schools />} />
              <Route path={routes.departments} element={<Departments />} />
              <Route path={routes.courses} element={<Courses />} />
              <Route path={routes.classes} element={<Classes />} />
              <Route path={routes.staff} element={<Staff />} />
              <Route path={routes.sessions} element={<Sessions />} />
              <Route path={routes.students} element={<Students />} />
              <Route path={routes.assessments} element={<Assessments />} />
              <Route path={routes.custodians} element={<Custodians />} />

              {/* classes */}
              <Route path={routes.classCourses} element={<Classes />} />
              <Route path={routes.singleClass} element={<SingleClass />} />
            </Route>
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
