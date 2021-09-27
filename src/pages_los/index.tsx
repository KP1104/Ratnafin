import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider, AuthLoginController, ProtectedRoutes } from "./auth";
import { PagesLOS } from "./pages_los";

const EntryPoint = () => (
  <Fragment>
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AuthLoginController />} />
        <Route
          path="*"
          element={
            <ProtectedRoutes>
              <PagesLOS />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </AuthProvider>
  </Fragment>
);

export default EntryPoint;
