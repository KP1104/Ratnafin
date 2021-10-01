import { useState, Fragment, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AppBar } from "./appBar";
import { MySideBar } from "./sideBar";
import { Drawer } from "./drawer";
import { Content } from "./content";
import { Inquiry } from "pages_los/pages/inquiry";
import { Lead } from "pages_los/pages/lead";
import { PartnerWrapper } from "pages_los/pages/partner";
import { TaskManagement } from "pages_los/pages/taskManagement";
import { Profile } from "pages_los/pages/profile";
import { Dashboard } from "pages_los/pages/dashboard";
import { NewInquiry } from "pages_los/pages/newInquiry";
import { Config } from "pages_los/pages/config";
import { Reports } from "pages_los/pages/reports";
import { Campaign } from "pages_los/pages/campaign";
import TestForm from "components/dyanmicForm/test";
import Editor from "components/editor";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useStyles } from "./style";

export const PagesLOS = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerState] = useState(true);
  const handleDrawerOpen = () => setDrawerState(true);
  const handleDrawerClose = () => setDrawerState(false);
  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar open={drawerOpen} handleDrawerOpen={handleDrawerOpen} />
        <Drawer open={drawerOpen} handleDrawerClose={handleDrawerClose}>
          <MySideBar
            handleDrawerOpen={handleDrawerOpen}
            open={drawerOpen}
            basePath="/los"
          />
        </Drawer>
        <Content>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            {/*New Inquiries */}
            <Route
              path="newInquiry/*"
              element={<NewInquiry key="inquiryx" />}
            />
            <Route path="inquiry/*" element={<Inquiry />} />
            <Route path="lead/*" element={<Lead />} />
            <Route path="partner/*" element={<PartnerWrapper />} />
            <Route path="task/*" element={<TaskManagement />} />
            <Route path="profile" element={<Profile />} />
            <Route path="config/*" element={<Config />} />
            <Route path="reports/*" element={<Reports />} />
            <Route path="campaign/*" element={<Campaign />} />
            {/*dummy routes*/}
            <Route path="testForm" element={<TestForm />} />
            <Route path="editor" element={<Editor />} />
            {/*End of dummy routes*/}
            <Route path="*" element={<RedirectComponent />} />
          </Routes>
        </Content>
      </div>
    </Fragment>
  );
};

const RedirectComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/los") {
      navigate("/los/dashboard");
    } else {
      navigate(location.pathname);
    }
  }, [navigate, location.pathname]);
  return null;
};
