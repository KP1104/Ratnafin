import { useRef, useContext } from "react";
import { useQuery } from "react-query";
import { cacheWrapperKeyGen } from "cache";
import Alert from "@material-ui/lab/Alert";
import loaderGif from "assets/images/loader.gif";
import { SelectFile } from "./select";
import { ToPreviewDocument } from "./preview";
import { DOCContext } from "./context";

export const DocumentUploadTermsheet = ({ branchID, isDataChangedRef }) => {
  const { documentIfExist } = useContext(DOCContext);
  const wrapperKey = useRef<any>(null);
  if (wrapperKey.current === null) {
    wrapperKey.current = cacheWrapperKeyGen(
      Object.values(documentIfExist.args)
    );
  }

  const queryData = useQuery<any, any, any>(
    ["documentIfExist", wrapperKey.current, branchID],
    () => documentIfExist.fn(documentIfExist.args)(branchID)
  );

  const loading = queryData.isLoading || queryData.isFetching;
  const isError = queryData.isError;
  const errorMsg = `${queryData.error?.error_msg}`;

  return (
    <>
      <div style={{ padding: "10px" }}>
        {loading ? (
          <img src={loaderGif} width="50px" height="50px" alt="loader" />
        ) : Boolean(isError) ? (
          <Alert severity="error">{errorMsg}</Alert>
        ) : queryData?.data?.fileExist === "Yes" ? (
          <ToPreviewDocument
            tranCD={queryData?.data?.tranCD}
            fileName={queryData?.data?.fileName}
            isDataChangedRef={isDataChangedRef}
          />
        ) : (
          <SelectFile
            isDataChangedRef={isDataChangedRef}
            tranCD={queryData?.data?.tranCD}
            closeUpdate={() => {}}
            update={false}
          />
        )}
      </div>
    </>
  );
};
