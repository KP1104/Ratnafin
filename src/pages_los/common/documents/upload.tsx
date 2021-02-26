import { useContext, useEffect } from "react";
import { FileUploadControl } from "components/fileUpload";
import { useQuery } from "react-query";
import { DOCCRUDContext } from "./context";
import { ClearCacheContext } from "cache";
import loaderGif from "assets/images/loader.gif";

export const UploadDocumentsApiWrapper = ({
  onClose,
  editableFileName,
  dataChangedRef,
}) => {
  const {
    uploadDocuments,
    getDocumentUploadAddtionalFieldsMetaData,
    context,
  } = useContext(DOCCRUDContext);
  const removeCache = useContext(ClearCacheContext);

  useEffect(() => {
    removeCache?.addEntry([
      "getDocumentUploadAddtionalFieldsMetaData",
      context.moduleType,
      context.docType,
    ]);
  }, []);
  const query = useQuery(
    [
      "getDocumentUploadAddtionalFieldsMetaData",
      context.moduleType,
      context.docType,
    ],
    () =>
      getDocumentUploadAddtionalFieldsMetaData.fn(
        getDocumentUploadAddtionalFieldsMetaData.args
      ),
    {
      cacheTime: 100000000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  //@ts-ignore
  let error = `${query.error?.error_msg ?? "unknown message"}`;
  const renderResult = query.isLoading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : query.isError === true ? (
    <span>{error}</span>
  ) : (
    <FileUploadControl
      onClose={onClose}
      additionalColumns={query.data}
      editableFileName={editableFileName}
      dataChangedRef={dataChangedRef}
      onUpload={uploadDocuments.fn(uploadDocuments.args)}
      gridProps={context}
    />
  );
  return renderResult;
};
