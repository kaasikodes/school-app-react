import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "react-auth-kit";
import { RequireAuth } from "react-auth-kit";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Estates from "./pages/Estates";
import EstateOwners from "./pages/EstateOwners";
import Staff from "./pages/Staff";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider
      authType={"localstorage"}
      authName={"cpaat_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route
              path="/"
              element={
                <RequireAuth loginPath={"/login"}>
                  <Root />
                </RequireAuth>
              }
            >
              <Route index element={<Home />} />
              <Route path="estates" element={<Estates />} />
              <Route path="estate-owners" element={<EstateOwners />} />
              <Route path="/staff" element={<Staff />} />
            </Route>
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
