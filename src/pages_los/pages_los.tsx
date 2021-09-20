import { useState, Fragment, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AppBar } from "./appBar";
import { MySideBar } from "./sideBar";
import { Drawer } from "./drawer";
import { Content } from "./content";

import {
  AllAssignedInquiry,
  AssignedInquiry,
  CrossInquiry,
  IncomingInquiry,
  MyCrossInquiry,
  MyInquiry,
  MyTeamCrossInquiry,
  MyUnmappedInquiry,
  UnmappedHOInquiry,
  UnmappedInqiry,
} from "pages_los/pages/inquiry";
import { BecomePartner } from "pages_los/pages/partner";
import {
  MandateLeads,
  BankLoginLeads,
  Leads,
  SanctionLeads,
  DisbursementLeads,
} from "pages_los/pages/lead";
import { Profile } from "pages_los/pages/profile";
import { Dashboard } from "pages_los/pages/dashboard";
import { NewInquiry } from "pages_los/pages/newInquiry";
import { UserManagement } from "pages_los/pages/config/userManagement";
import { AssignPincodeToBranch } from "pages_los/pages/config/assignPincodeToBranch";
import {
  MyTask,
  AssignedTask,
  Worklog,
  ColdCalling,
} from "pages_los/pages/taskManagement";
import { BankConfigWrapper, BankMasterWrapper } from "pages_los/pages/config";
import { LeadStagesSMECF, LeadInquiry } from "pages_los/pages/reports";
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
          <MySideBar handleDrawerOpen={handleDrawerOpen} open={drawerOpen} />
        </Drawer>
        <Content>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            {/*New Inquiries */}
            <Route
              path="/newInquiry/*"
              element={<NewInquiry key="inquiryx" />}
            />
            {/* Inquiries */}
            <Route
              path="/inquiry/allAssignedInquiries/*"
              element={<AllAssignedInquiry />}
            />
            <Route
              path="/inquiry/assignedInquiries/*"
              element={<AssignedInquiry />}
            />
            <Route
              path="/inquiry/crossInquiries/*"
              element={<CrossInquiry />}
            />
            <Route
              path="/inquiry/incomingInquiries/*"
              element={<IncomingInquiry />}
            />
            <Route
              path="/inquiry/myCrossInquiries/*"
              element={<MyCrossInquiry />}
            />
            <Route path="/inquiry/myInquiry/*" element={<MyInquiry />} />
            <Route
              path="/inquiry/myTeamCrossInquiries/*"
              element={<MyTeamCrossInquiry />}
            />
            <Route
              path="/inquiry/myUnmappedInquiries/*"
              element={<MyUnmappedInquiry />}
            />
            <Route
              path="/inquiry/unmappedHOInquiries/*"
              element={<UnmappedHOInquiry />}
            />
            <Route
              path="/inquiry/unmappedInquiries/*"
              element={<UnmappedInqiry />}
            />
            <Route path="/partner" element={<BecomePartner />} />

            <Route path="/lead/details/*" element={<Leads />} />
            <Route path="/lead/mandate/*" element={<MandateLeads />} />
            <Route path="/lead/bankLogin/*" element={<BankLoginLeads />} />
            <Route path="/lead/sanction/*" element={<SanctionLeads />} />
            <Route
              path="/lead/disbursement/*"
              element={<DisbursementLeads />}
            />
            <Route path="/task/myTask/*" element={<MyTask />} />
            <Route path="/task/assigned/*" element={<AssignedTask />} />
            <Route path="/task/worklog" element={<Worklog />} />
            <Route path="/task/coldCalling/*" element={<ColdCalling />} />
            <Route path="/config/bankMaster" element={<BankMasterWrapper />} />
            <Route path="/config/banks" element={<BankConfigWrapper />} />
            <Route path="/config/userManagement" element={<UserManagement />} />
            <Route
              path="/config/assignPincode"
              element={<AssignPincodeToBranch />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/reports/leadStagesSMECF"
              element={<LeadStagesSMECF />}
            />
            <Route
              path="/reports/leadStagesRetail"
              element={<LeadStagesSMECF />}
            />
            <Route path="/reports/leadInquiry" element={<LeadInquiry />} />
            <Route path="/*" element={<RedirectComponent />} />
            {/*dummy routes*/}
            <Route path="/testForm" element={<TestForm />} />
            <Route path="/editor" element={<Editor />} />
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
