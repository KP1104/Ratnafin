import { useState, useCallback, FC, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import loaderGif from "assets/images/loader.gif";
import { useLocation } from "react-router";
import { useMutation, useQuery } from "react-query";
import { useSnackbar } from "notistack";
import { queryClient } from "cache";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { InitialValuesType, SubmitFnType } from "packages/form";
import { cloneDeep } from "lodash-es";
import { becomePartnerMetaData } from "./metadata/form";
import * as API from "./api";
import { Transition } from "pages_los/common";

interface updatePartnerDetailsType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  tranCD?: string;
}

const updatePartnerDetailsWrapperFn =
  (updateTaskData) =>
  async ({ data, tranCD }: updatePartnerDetailsType) => {
    return updateTaskData(data, tranCD);
  };

export const ViewEditPartnerDetails: FC<any> = ({
  isDataChangedRef,
  closeDialog,
  defaultView = "view",
  setEditFormStateFromInitValues,
  readOnly,
  formStyle,
  tranCD,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formMode, setFormMode] = useState(defaultView);
  const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);

  const result = useQuery(["getPartnerFormData", tranCD], () =>
    API.getBecomePartnerFormData(tranCD)
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getPartnerFormData", tranCD]);
    };
  }, []);

  const mutation = useMutation(
    updatePartnerDetailsWrapperFn(
      API.updateBecomePartnerData({
        tranCD: tranCD,
      })
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
        result.refetch();
        enqueueSnackbar("Partner Details Update Successfully", {
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
    mutation.mutate({ data, displayData, endSubmit, setFieldError });
  };

  const dataUniqueKey = `${result.dataUpdatedAt}`;
  const loading = result.isLoading || result.isFetching;
  let isError = result.isError;
  //@ts-ignore
  let errorMsg = `${result.error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  let formEditData = result.data;

  let editViewMetaData: MetaDataType = {} as MetaDataType;

  if (result.isSuccess) {
    const formStateFromInitValues =
      typeof setEditFormStateFromInitValues === "function"
        ? setEditFormStateFromInitValues(result.data)
        : undefined;
    editViewMetaData = cloneDeep(becomePartnerMetaData) as MetaDataType;

    editViewMetaData.form.formState = {
      formCode: editViewMetaData.form.name,
      ...formStateFromInitValues,
    };
    editViewMetaData.form.name = `${editViewMetaData.form.name}-${formMode}`;
    if (editViewMetaData?.form?.render?.renderType === "stepper") {
      editViewMetaData.form.render.renderType = "tabs";
    }
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
      <Alert severity="error">{errorMsg}</Alert>
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
      metaData={editViewMetaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
      //@ts-ignore
      displayMode={formMode}
      formStyle={formStyle}
    >
      {!readOnly ? <Button onClick={moveToEditMode}>Edit</Button> : null}
      {typeof closeDialog === "function" ? (
        <Button onClick={closeDialog}>Cancel</Button>
      ) : null}
    </FormWrapper>
  ) : formMode === "edit" ? (
    <FormWrapper
      key={`${dataUniqueKey}-${formMode}`}
      metaData={editViewMetaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
      //@ts-ignore
      displayMode={formMode}
      formStyle={formStyle}
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

export const ViewEditPartnerDetailsWrapper = ({
  isDataChangedRef,
  closeDialog,
}) => {
  const { state: rows }: any = useLocation();

  return (
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
      <ViewEditPartnerDetails
        isDataChangedRef={isDataChangedRef}
        closeDialog={closeDialog}
        defaultView="view"
        formStyle={{
          background: "white",
          overflowY: "hidden",
          overflowX: "hidden",
        }}
        readOnly={false}
        tranCD={rows[0].id}
      />
    </Dialog>
  );
};
