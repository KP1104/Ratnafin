import { useRef, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { cacheWrapperKeyGen } from "cache";
import Alert from "@material-ui/lab/Alert";
import loaderGif from "assets/images/loader.gif";
import { queryClient, ClearCacheContext } from "cache";
import { SelectFile } from "./select";
import { ToPreviewDocument } from "./preview";
import { DOCContext } from "./context";

export const DocumentUploadTermsheet = ({ branchID, isDataChangedRef }) => {
  const { documentIfExist, context } = useContext(DOCContext);
  const removeCache = useContext(ClearCacheContext);
  const wrapperKey = useRef<any>(null);
  if (wrapperKey.current === null) {
    wrapperKey.current = cacheWrapperKeyGen(
      Object.values(documentIfExist.args)
    );
  }

  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
      queryClient.removeQueries([
        "documentIfExist",
        context.refID,
        branchID,
        context.moduleType,
      ]);
    };
  }, [branchID]);

  const queryData = useQuery<any, any, any>(
    ["documentIfExist", context.refID, branchID, context.moduleType],
    () => documentIfExist.fn(context.refID, branchID, context.moduleType)
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
            branchID={branchID}
            fileName={queryData?.data?.fileName}
            isDataChangedRef={isDataChangedRef}
          />
        ) : (
          <SelectFile
            isDataChangedRef={isDataChangedRef}
            tranCD={queryData?.data?.tranCD}
            branchID={branchID}
            closeUpdate={() => {}}
            update={false}
          />
        )}
      </div>
    </>
  );
};
