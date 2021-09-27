import { Routes, Route } from "react-router-dom";
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
} from "./views";

export const Inquiry = () => (
  <Routes>
    <Route path="allAssignedInquiries/*" element={<AllAssignedInquiry />} />
    <Route path="assignedInquiries/*" element={<AssignedInquiry />} />
    <Route path="crossInquiries/*" element={<CrossInquiry />} />
    <Route path="incomingInquiries/*" element={<IncomingInquiry />} />
    <Route path="myCrossInquiries/*" element={<MyCrossInquiry />} />
    <Route path="myInquiry/*" element={<MyInquiry />} />
    <Route path="myTeamCrossInquiries/*" element={<MyTeamCrossInquiry />} />
    <Route path="myUnmappedInquiries/*" element={<MyUnmappedInquiry />} />
    <Route path="unmappedHOInquiries/*" element={<UnmappedHOInquiry />} />
    <Route path="unmappedInquiries/*" element={<UnmappedInqiry />} />
  </Routes>
);
