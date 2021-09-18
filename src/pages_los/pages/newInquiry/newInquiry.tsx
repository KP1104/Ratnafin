import { useEffect, useState } from "react";
import { InquiryFormWrapper } from "./inquiryForm";
import { useLocation } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

export const NewInquiry = () => {
  const [currentView, setCurrentView] = useState("inquiry");
  const [successID, setSuccessID] = useState("");
  const location = useLocation();
  const { key, search } = location;
  let params = new URLSearchParams(search);

  useEffect(() => {
    setCurrentView("inquiry");
    setSuccessID("");
  }, [key]);

  const onSuccessHandler = (refID) => {
    setSuccessID(refID);
    setCurrentView("success");
  };

  const result =
    currentView === "inquiry" ? (
      <InquiryFormWrapper
        key={key}
        onSuccess={onSuccessHandler}
        categoryID={params.get("categoryID")}
        productID={params.get("productID")}
      />
    ) : (
      <Alert>
        <AlertTitle>Success</AlertTitle>
        Inquiry has been successfully Registered with Inquiry No:
        <b> #{successID}</b>.
      </Alert>
    );

  return result;
};
