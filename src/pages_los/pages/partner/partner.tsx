import { Fragment, useState, useEffect, useContext, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import { useQuery } from "react-query";
import { ClearCacheProvider, ClearCacheContext, queryClient } from "cache";
import { InvalidAction } from "pages_los/common/invalidAction";
import { AddPartner, ViewEditPartnerDetails } from "./partnerCRUD";
import { ActionTypes } from "components/dataTable";
import { GridMetaDataType } from "components/dataTable/types";
import GridWrapper from "components/dataTableStatic";
import { DocumentGridCRUD } from "./docUpload";
import { partnerGridMetaData } from "./partnerCRUD/metadata";
import * as API from "./partnerCRUD/api";

const actions: ActionTypes[] = [
  {
    actionName: "AddPartner",
    actionLabel: "Add Partner",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "editDetails",
    actionLabel: "Edit",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "Document",
    actionLabel: "Document Details",
    multiple: false,
    rowDoubleClick: false,
  },
];

export const BecomePartner = () => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);

  const handleDialogClose = () => {
    setCurrentAction(null);
    if (isDataChangedRef.current === true) {
      myGridRef.current?.refetch?.();
      isDataChangedRef.current = false;
    }
  };

  const result = useQuery<any, any>(["getPartnerGridData"], () =>
    API.getPartnerGridData()
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getPartnerGridData"]);
    };
  }, []);

  return (
    <Fragment>
      <GridWrapper
        key={`externalAPIGridStatusListing`}
        finalMetaData={partnerGridMetaData as GridMetaDataType}
        data={result.data ?? []}
        setData={() => null}
        loading={result.isLoading || result.isFetching}
        actions={actions}
        setAction={setCurrentAction}
        refetchData={() => result.refetch()}
        ref={myGridRef}
      />
      <ClearCacheProvider>
        <Dialog open={Boolean(currentAction)} fullScreen>
          <PartnerActions
            currentAction={currentAction}
            handleDialogClose={handleDialogClose}
            isDataChangedRef={isDataChangedRef}
          />
        </Dialog>
      </ClearCacheProvider>
    </Fragment>
  );
};

const PartnerActions = ({
  currentAction,
  handleDialogClose,
  isDataChangedRef,
}) => {
  const removeCache = useContext(ClearCacheContext);
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, [removeCache]);
  return (currentAction?.name ?? "") === "AddPartner" ? (
    <AddPartner
      isDataChangedRef={isDataChangedRef}
      closeDialog={handleDialogClose}
    />
  ) : (currentAction?.name ?? "") === "editDetails" ? (
    <ViewEditPartnerDetails
      defaultView="view"
      isDataChangedRef={isDataChangedRef}
      closeDialog={handleDialogClose}
      tranCD={currentAction?.rows[0].id}
    />
  ) : (currentAction?.name ?? "") === "Document" ? (
    <DocumentGridCRUD
      tranCD={currentAction?.rows[0].id}
      closeDialog={handleDialogClose}
    />
  ) : (
    <InvalidAction closeDialog={handleDialogClose} />
  );
};
