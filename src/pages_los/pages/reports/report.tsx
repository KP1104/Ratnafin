import { Routes, Route } from "react-router-dom";
import { LeadInquiry } from "./leadInquiry";
import { LeadStagesRetail } from "./leadStagesRetail";
import { LeadStagesSMECF } from "./leadStagesSMECF";

export const Reports = () => (
  <Routes>
    <Route path="leadStagesSMECF" element={<LeadStagesSMECF />} />
    <Route path="leadStagesRetail" element={<LeadStagesSMECF />} />
    <Route path="leadInquiry" element={<LeadInquiry />} />
  </Routes>
);
