import { Routes, Route } from "react-router-dom";
import {
  MandateLeads,
  BankLoginLeads,
  Leads,
  SanctionLeads,
  DisbursementLeads,
} from "./views";

export const Lead = () => (
  <Routes>
    <Route path="details/*" element={<Leads />} />
    <Route path="mandate/*" element={<MandateLeads />} />
    <Route path="bankLogin/*" element={<BankLoginLeads />} />
    <Route path="sanction/*" element={<SanctionLeads />} />
    <Route path="disbursement/*" element={<DisbursementLeads />} />
  </Routes>
);
