import { Routes, Route } from "react-router-dom";
import { InquiryGridSelector } from "./inquiryGridSelector";
import { screens } from "./consts";

export const Inquiry = () => (
  <Routes>
    <Route
      path="all-assigned-inquiries/*"
      element={<InquiryGridSelector gridCode={screens.allAssignedInquiries} />}
    />
    <Route
      path="assigned-inquiries/*"
      element={<InquiryGridSelector gridCode={screens.assignedInquiries} />}
    />
    <Route
      path="cross-inquiries/*"
      element={<InquiryGridSelector gridCode={screens.crossInquiries} />}
    />
    <Route
      path="incoming-inquiries/*"
      element={<InquiryGridSelector gridCode={screens.incomingInquiries} />}
    />
    <Route
      path="my-cross-inquiries/*"
      element={<InquiryGridSelector gridCode={screens.myCrossInquiries} />}
    />
    <Route
      path="my-inquiries/*"
      element={<InquiryGridSelector gridCode={screens.myInquiry} />}
    />
    <Route
      path="my-teamcross-inquiries/*"
      element={<InquiryGridSelector gridCode={screens.myTeamCrossInquiries} />}
    />
    <Route
      path="my-unmapped-inquiries/*"
      element={<InquiryGridSelector gridCode={screens.myUnmappedInquiries} />}
    />
    <Route
      path="unmapped-ho-inquiries/*"
      element={<InquiryGridSelector gridCode={screens.unmappedHOInquiries} />}
    />
    <Route
      path="unmapped-inquiries/*"
      element={<InquiryGridSelector gridCode={screens.unmappedInquiries} />}
    />
  </Routes>
);
