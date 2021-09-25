import { FC, Fragment, useCallback, useEffect, useState } from "react";
import loaderGif from "assets/images/loader.gif";
import { useLocation } from "react-router-dom";
import { queryClient } from "cache";
import { useSnackbar } from "notistack";
import { cloneDeep } from "lodash-es";
import { useMutation, useQueries } from "react-query";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import Dialog from "@material-ui/core/Dialog";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { Alert } from "components/common/alert";
import { Transition } from "pages_los/common";
import { useDialogStyles } from "pages_los/common/dialogStyles";
import { SubmitFnType } from "packages/form";
import * as API from "./api";

interface updateMasterDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  bankCode: string;
}

const updateMasterDataWrapperFn =
  (updateMasterData) =>
  async ({ data }: updateMasterDataType) => {
    return updateMasterData(data);
  };

const ViewEditMaster: FC<{
  moduleType: any;
  isDataChangedRef: any;
  closeDialog?: any;
  defaultView?: "view" | "edit";
  readOnly?: boolean;
  code: string;
  name;
}> = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  defaultView = "view",
  readOnly = false,

  //backend side code is pending
  code,
  name,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formMode, setFormMode] = useState(defaultView);
  const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);

  const mutation = useMutation(
    updateMasterDataWrapperFn(API.updateMastersData({ moduleType })),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_detail ?? "");
      },
      onSuccess: (data, { endSubmit }) => {
        queryClient.refetchQueries(["getFormData", moduleType]);
        endSubmit(true, "");
        enqueueSnackbar("Update Successfully", {
          variant: "success",
        });
        isDataChangedRef.current = true;
        moveToViewMode();
        if (typeof closeDialog === "function") {
          closeDialog();
        }
      },
    }
  );

  const onSubmitHandler: SubmitFnType = (
    data,
    displayData,
    endSubmit,
    setFieldError
  ) => {
    //@ts-ignore
    mutation.mutate({ data, displayData, endSubmit, setFieldError });
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getFormData", moduleType]);
      queryClient.removeQueries(["getFormMetadata", moduleType]);
    };
  }, []);

  const result = useQueries([
    {
      queryKey: ["getFormData", moduleType],
      queryFn: () => API.getMastersFormData({ moduleType }),
    },
    {
      queryKey: ["getFormMetadata", moduleType, "edit"],
      queryFn: () => API.getMasterFormMetadata({ moduleType, type: "edit" }),
    },
  ]);

  const dataUniqueKey = `${result[0].dataUpdatedAt}`;
  const loading =
    result[0].isLoading ||
    result[1].isLoading ||
    result[0].isFetching ||
    result[1].isFetching;
  let isError = result[0].isError || result[1].isError;
  //@ts-ignore
  let errorMsg = `${result[0].error?.error_msg} ${
    //@ts-ignore
    result[1].error?.error_msg
  }`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  //@ts-ignore
  let error_detail = `${result[0]?.error?.error_dtl} ${
    //@ts-ignore
    result[1].error?.error_dtl
  }`;

  let viewEditMetaData: MetaDataType = {} as MetaDataType;
  if (result[0].isSuccess && result[1].isSuccess) {
    viewEditMetaData = cloneDeep(result[1].data) as MetaDataType;
  }

  const renderResult = loading ? (
    <>
      <img src={loaderGif} alt="loader" width="50px" height="50px" />
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </>
  ) : isError === true ? (
    <>
      <Alert
        severity="error"
        errorMsg={errorMsg}
        errorDetail={error_detail ?? ""}
      />
      {typeof closeDialog === "function" ? (
        <div style={{ position: "absolute", right: 0, top: 0 }}>
          <IconButton onClick={closeDialog}>
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
      ) : null}
    </>
  ) : formMode === "view" ? (
    <FormWrapper
      key={`${dataUniqueKey}-${formMode}`}
      metaData={viewEditMetaData as MetaDataType}
      onSubmitHandler={onSubmitHandler}
      initialValues={result[0]?.data}
      //@ts-ignore
      displayMode={formMode}
      formStyle={{
        background: "white",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {!readOnly ? <Button onClick={moveToEditMode}>Edit</Button> : null}
      {typeof closeDialog === "function" ? (
        <Button onClick={closeDialog}>Cancel</Button>
      ) : null}
    </FormWrapper>
  ) : formMode === "edit" ? (
    <FormWrapper
      key={`${dataUniqueKey}-${formMode}`}
      metaData={viewEditMetaData as MetaDataType}
      onSubmitHandler={onSubmitHandler}
      initialValues={result[0]?.data}
      //@ts-ignore
      displayMode={formMode}
      formStyle={{
        background: "white",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            Save
          </Button>
          <Button onClick={moveToViewMode} disabled={isSubmitting}>
            Cancel
          </Button>
        </>
      )}
    </FormWrapper>
  ) : null;
  return renderResult;
};

export const ViewEditMasterWrapper = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
}) => {
  const { state: rows }: any = useLocation();
  const name = rows[0]?.data;
  const classes = useDialogStyles();
  return (
    <Fragment>
      <Dialog
        open={true}
        maxWidth="md"
        //@ts-ignore
        TransitionComponent={Transition}
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <ViewEditMaster
          code={rows[0]?.id}
          name={name?.regionName ?? name?.zoneName ?? name?.countruName ?? ""}
          moduleType={moduleType}
          isDataChangedRef={isDataChangedRef}
          closeDialog={closeDialog}
        />
      </Dialog>
    </Fragment>
  );
};
