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
import { leadAssignMetadata } from "./metadataLead";
import { InquiryAssignMetadata } from "./metadataInquiry";
import * as API from "./api";
import { ClearCacheContext } from "cache";
import Dialog from "@material-ui/core/Dialog";
import { useLocation } from "react-router-dom";
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

export const Assignment = ({
  moduleType,
  assignmentType,
  refID,
  isDataChangedRef,
  closeDialog,
  maxRows,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const removeCache = useContext(ClearCacheContext);

  useEffect(() => {
    removeCache?.addEntry([
      "getCurrentAssignment",
      { refID, assignmentType, moduleType },
    ]);
  }, [removeCache]);

  const queryData = useQuery<any, any, any>(
    ["getCurrentAssignment", { refID, assignmentType, moduleType }],
    API.getCurrentAssignment({ refID, assignmentType, moduleType }),
    { cacheTime: 0 }
  );

  const mutation = useMutation(
    insertFormDataFnWrapper(
      API.assignMembers({ moduleType, assignmentType, refID })
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
      key="Assignment"
      metaData={
        moduleType === "lead"
          ? (leadAssignMetadata as MetaDataType)
          : (InquiryAssignMetadata as MetaDataType)
      }
      initialValues={queryData.data}
      onSubmitHandler={onSubmitHandler}
      displayMode={"new"}
      hideDisplayModeInTitle={true}
      formState={{
        moduleType: moduleType,
        assignmentType: assignmentType,
        refID: refID,
        maxRows: maxRows,
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

export const AssignmentWrapper = ({
  moduleType,
  isDataChangedRef,
  handleDialogClose,
  assignmentType,
  goBackPath = "..",
  HeaderDetailsComponent,
  maxRows,
}) => {
  const { state: rows }: any = useLocation();
  console.log(rows);
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
      <HeaderDetailsComponent
        rowData={rows?.[0]}
        productData={rows?.[0]?.data}
        handleDialogClose={handleDialogCloseWrapper}
        isDataChangedRef={isDataChangedRef}
      />
      <Assignment
        moduleType={moduleType}
        refID={rows?.[0].id}
        isDataChangedRef={isDataChangedRef}
        assignmentType={assignmentType}
        closeDialog={handleDialogCloseWrapper}
        maxRows={maxRows}
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
