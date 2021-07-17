import { useRef, useContext } from "react";
import { useQuery } from "react-query";
import { cacheWrapperKeyGen } from "cache";
import loaderGif from "assets/images/loader.gif";
import { SelectFile } from "./select";
import { ToPreviewDocument } from "./preview";
import { DOCContext } from "./context";

export const DocumentUploadTermsheet = ({
  tranCD,
  closeDialog,
  isDataChangedRef,
}) => {
  const { documentIfExist } = useContext(DOCContext);
  const wrapperKey = useRef<any>(null);
  if (wrapperKey.current === null) {
    wrapperKey.current = cacheWrapperKeyGen(
      Object.values(documentIfExist.args)
    );
  }

  const queryData = useQuery<any, any, any>(
    ["documentIfExist", wrapperKey.current],
    () => documentIfExist.fn(documentIfExist.args)
  );

  const loading = queryData.isLoading || queryData.isFetching;
  const isError = queryData.isError;
  const errorMsg = `${queryData.error?.error_msg}`;

  return (
    <>
      {loading ? (
        <img src={loaderGif} width="50px" height="50px" alt="loader" />
      ) : Boolean(isError) ? (
        <span>{errorMsg}</span>
      ) : queryData?.data?.fileExist === "Yes" ? (
        <ToPreviewDocument tranCD={tranCD} />
      ) : (
        <SelectFile
          closeDialog={closeDialog}
          isDataChangedRef={isDataChangedRef}
        />
      )}
    </>
  );
};
