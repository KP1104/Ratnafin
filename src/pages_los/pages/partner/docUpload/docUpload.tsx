import { Fragment, useState, FC, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { ClearCacheContext } from "cache";
import loaderGif from "assets/images/loader.gif";
import {
  DOCCRUDContextProvider,
  DocAPICrudProviderGenerator,
} from "pages_los/common/documents/context";
import { DocumentGridCRUD as DocGrid } from "pages_los/common/documents/documentGridCRUD";
import Button from "@material-ui/core/Button";
import * as API from "../api";

export const DocumentGridCRUD: FC<{
  tranCD: string;
  closeDialog?: any;
}> = ({ tranCD, closeDialog }) => {
  const removeCache = useContext(ClearCacheContext);

  useEffect(() => {
    /*eslint-disable  react-hooks/exhaustive-deps*/
    removeCache?.addEntry(["getDocumentCRUDTabsMetadata"]);
  }, [removeCache, tranCD]);

  const queryResult = useQuery(
    ["getDocumentCRUDTabsMetadata"],
    () => API.getDocumentCRUDTabsMetadata
  );

  let response: any[] = queryResult.data as any;

  const renderResult = queryResult.isLoading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : queryResult.isError ? (
    //@ts-ignore
    queryResult.error?.error_msg ?? "unknown error occured"
  ) : (
    <Fragment>
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
        {response.map((one) => {
          return (
            <DOCCRUDContextProvider
              key={one.docType.filter((one) => one?.primary === true)[0].type}
              {...DocAPICrudProviderGenerator(
                "lead",
                "partner",
                one.docType,
                tranCD,
                ""
              )}
            >
              <DocGrid />
            </DOCCRUDContextProvider>
          );
        })}
      </div>
    </Fragment>
  );
  return renderResult;
};
