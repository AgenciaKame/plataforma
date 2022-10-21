import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Lessons from "./components/Lessons/Lessons";
import Lesson from "./components/Lessons/Lesson";
import Unit from "./components/Lessons/Unit";
import Login from "./features/auth/Login/Login";
import PlatformLayout from "./components/PlatformLayout";
import Welcome from "./features/auth/Welcome/Welcome";
import UserList from "./features/users/UserList";
import EditUser from "./features/users/EditUser";
import Signup from "./features/users/Signup/Signup";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/Login/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import RecoverPassword from "./features/auth/Login/RecoverPassword";
import PromptDone from "./features/auth/Login/PromptDone";

function App() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="cambiodeclave" element={<RecoverPassword />} />
        <Route path="cambiodeclave/:id" element={<RecoverPassword />} />
        <Route path="cambiodeclave/done" element={<PromptDone />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<PlatformLayout />}>
                <Route index element={<Welcome />} />
                <Route path="categorias">
                  <Route index element={<Lessons />} />
                  <Route path=":title">
                    <Route index element={<Lesson />} />
                    <Route path=":unitTitle" element={<Unit />} />
                  </Route>
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="usuarios">
                    <Route index element={<UserList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="registro" element={<Signup />} />
                  </Route>
                </Route>
              </Route>
              {/* End /dash */}
            </Route>
          </Route>
          {/* End Require Auth */}
        </Route>
      </Route>

      {/* Route redirect */}
      <Route path="/*" element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default App;
