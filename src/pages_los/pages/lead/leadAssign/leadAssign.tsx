import { useContext, useEffect, Fragment, useCallback } from "react";
import { useNavigate } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { useMutation, useQuery } from "react-query";
import { useSnackbar } from "notistack";
import { SubmitFnType } from "packages/form";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { leadAssignMetadata } from "./metadata";
import * as API from "./api";
import { ClearCacheContext } from "cache";
import Dialog from "@material-ui/core/Dialog";
import { useLocation } from "react-router-dom";
import { HeaderDetails } from "../headerDetails";
import { Transition } from "pages_los/common";
import loaderGif from "assets/images/loader.gif";
import { useDialogStyles } from "pages_los/common/dialogStyles";

interface InsertFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const insertFormDataFnWrapper =
  (leadAssignFn) =>
  async ({ data }: InsertFormDataFnType) => {
    return leadAssignFn(data);
  };

export const LeadAssign = ({
  moduleType,
  refID,
  isDataChangedRef,
  closeDialog,
  assignmentType,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const removeCache = useContext(ClearCacheContext);

  useEffect(() => {
    removeCache?.addEntry([
      "getCurrentLeadAssignment",
      { refID, assignmentType },
    ]);
  }, [removeCache]);

  const queryData = useQuery<any, any, any>(
    ["getCurrentLeadAssignment", { refID, assignmentType, moduleType }],
    API.getCurrentLeadAssignment({ refID, assignmentType, moduleType }),
    { cacheTime: 0 }
  );

  const mutation = useMutation(
    insertFormDataFnWrapper(
      API.assignLeadMembers({ moduleType, assignmentType, refID })
    ),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_detail ?? "");
      },
      onSuccess: (data, { endSubmit }) => {
        endSubmit(true, "");
        isDataChangedRef.current = true;
        enqueueSnackbar("lead successfully assigned", {
          variant: "success",
        });
        closeDialog();
      },
    }
  );

  const onSubmitHandler: SubmitFnType = (
    data,
    displayData,
    endSubmit,
    setFieldError
  ) => {
    let result = validateData(data);
    if (!Boolean(result)) {
      mutation.mutate({
        data,
        displayData,
        endSubmit,
        setFieldError,
      });
    } else {
      endSubmit(false, result);
    }
  };

  return queryData.isLoading || queryData.isFetching ? (
    <Fragment>
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </Fragment>
  ) : queryData.isError ? (
    <Fragment>
      <span>{queryData.error?.error_msg ?? "Unknown error occured"}</span>
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </Fragment>
  ) : (
    <FormWrapper
      key="leadAssign"
      metaData={leadAssignMetadata as MetaDataType}
      initialValues={queryData.data}
      onSubmitHandler={onSubmitHandler}
      displayMode={"new"}
      hideDisplayModeInTitle={true}
      formState={{
        moduleType: moduleType,
        assignmentType: assignmentType,
        refID: refID,
      }}
    >
      {({ isSubmitting, handleSubmit }) => {
        return (
          <>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              Save
            </Button>
            <Button onClick={closeDialog} disabled={isSubmitting}>
              Cancel
            </Button>
          </>
        );
      }}
    </FormWrapper>
  );
};

export const LeadAssignWrapper = ({
  moduleType,
  isDataChangedRef,
  handleDialogClose,
  assignmentType,
  goBackPath = "..",
}) => {
  const { state: rows }: any = useLocation();
  const classes = useDialogStyles();
  let navigate = useNavigate();
  let handleDialogCloseWrapper = useCallback(() => {
    handleDialogClose();
    navigate(goBackPath);
  }, [navigate]);
  return (
    <Dialog
      maxWidth="md"
      open={true}
      //@ts-ignore
      TransitionComponent={Transition}
      PaperProps={{ style: { width: "100%", minHeight: "20vh" } }}
      classes={{
        scrollPaper: classes.topScrollPaper,
        paperScrollBody: classes.topPaperScrollBody,
      }}
    >
      <HeaderDetails
        rowData={rows?.[0]}
        handleDialogClose={handleDialogCloseWrapper}
        isDataChangedRef={isDataChangedRef}
      />
      <LeadAssign
        moduleType={moduleType}
        refID={rows[0].id}
        isDataChangedRef={isDataChangedRef}
        assignmentType={assignmentType}
        closeDialog={handleDialogCloseWrapper}
      />
    </Dialog>
  );
};

const validateData = ({ usersAssignDetails }: any) => {
  let roleVisited = [];
  let result = "";
  if (Array.isArray(usersAssignDetails)) {
    for (let i = 0; i < usersAssignDetails.length; i++) {
      //@ts-ignore
      if (roleVisited.indexOf(usersAssignDetails[i]?.teamRole) >= 0) {
        result = "No more than one person can have the same Team Role";
        break;
      } else {
        //@ts-ignore
        roleVisited.push(usersAssignDetails[i]?.teamRole);
      }
    }
  }
  return result;
};
