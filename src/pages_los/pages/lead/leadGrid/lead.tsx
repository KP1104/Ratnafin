import { Routes, Route } from "react-router-dom";
import { LeadGridSelector } from "./leadGridSelector";
import { screens } from "./consts";

export const Lead = () => (
  <Routes>
    <Route
      path="details/*"
      element={<LeadGridSelector gridCode={screens.details} />}
    />
    <Route
      path="mandate/*"
      element={<LeadGridSelector gridCode={screens.mandate} />}
    />
    <Route
      path="bank-login/*"
      element={<LeadGridSelector gridCode={screens.bankLogin} />}
    />
    <Route
      path="sanction/*"
      element={<LeadGridSelector gridCode={screens.sanction} />}
    />
    <Route
      path="disbursement/*"
      element={<LeadGridSelector gridCode={screens.disbursement} />}
    />
    <Route
      path="head-leads/*"
      element={<LeadGridSelector gridCode={screens.headDetails} />}
    />
  </Routes>
);
