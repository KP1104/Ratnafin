import { Fragment, FC, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { ClearCacheContext } from "cache";
import loaderGif from "assets/images/loader.gif";
import { DOCCRUDContextProvider } from "pages_los/common/documents/context";
import { DocumentGridCRUD as DocGrid } from "pages_los/common/documents/documentGridCRUD";
import * as API from "./api";
import { Transition } from "pages_los/common";

export const DocAPICrudProviderGenerator = (
  moduleType,
  productType,
  docCategory,
  refID,
  serialNo
) => ({
  context: {
    moduleType,
    productType,
    docCategory,
    refID,
    serialNo,
  },
  uploadDocuments: {
    fn: API.uploadDocuments,
    args: { moduleType, productType, refID, serialNo },
  },
  getDocumentsGridData: {
    fn: API.listDocuments,
    args: { moduleType, productType, refID, serialNo },
  },
  deleteDocuments: {
    fn: API.deleteDocuments,
    args: { moduleType, productType, refID, serialNo },
  },
  updateDocument: {
    fn: API.updateDocuments,
    args: { moduleType, productType, refID, serialNo },
  },
  verifyDocuments: {
    fn: API.verifyDocuments,
    args: { moduleType, productType, refID, serialNo },
  },
  getDocumentListingGridMetaData: {
    fn: API.getDocumentMetaData,
    args: { moduleType, productType, metaDataType: "grid" },
  },
  getDocumentUploadAddtionalFieldsMetaData: {
    fn: API.getDocumentMetaData,
    args: { moduleType, productType, metaDataType: "upload" },
  },
  getDocumentEditGridMetaData: {
    fn: API.getDocumentMetaData,
    args: { moduleType, productType, metaDataType: "edit" },
  },
  generateDocumentDownloadURL: {
    fn: API.generateDocumentDownloadURL,
    args: { moduleType, productType },
  },
  previewDocument: {
    fn: API.previewDocument,
    args: { moduleType, productType },
  },
});

export const DocumentGridCRUD: FC<{
  closeDialog?: any;
}> = ({ closeDialog }) => {
  const { state: rows }: any = useLocation();
  let tranCD = rows[0].id;
  const removeCache = useContext(ClearCacheContext);
  const queryResult = useQuery(["getDocumentCRUDTabsMetadata"], () =>
    API.getDocumentCRUDTabsMetadata()
  );

  useEffect(() => {
    removeCache?.addEntry(["getDocumentCRUDTabsMetadata"]);
  }, []);

  let response: any[] = queryResult.data as any;

  const renderResult = queryResult.isLoading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : queryResult.isError ? (
    //@ts-ignore
    queryResult.error?.error_msg ?? "unknown error occured"
  ) : (
    <Dialog
      open={true}
      //@ts-ignore
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          width: "100%",
          minHeight: "20vh",
        },
      }}
      maxWidth="md"
    >
      <div style={{ display: "flex" }}>
        {typeof closeDialog === "function" ? (
          <Fragment>
            <div style={{ flexGrow: 1 }} />
            <Button variant="text" onClick={closeDialog}>
              Close
            </Button>
          </Fragment>
        ) : null}
      </div>
      <div>
        {Array.isArray(response) &&
          response.map((one) => {
            return (
              <DOCCRUDContextProvider
                key={one.docType.filter((one) => one?.primary === true)[0].type}
                {...DocAPICrudProviderGenerator(
                  "",
                  "partner",
                  one.docType,
                  tranCD,
                  "1"
                )}
              >
                <DocGrid />
              </DOCCRUDContextProvider>
            );
          })}
      </div>
    </Dialog>
  );
  return renderResult;
};
