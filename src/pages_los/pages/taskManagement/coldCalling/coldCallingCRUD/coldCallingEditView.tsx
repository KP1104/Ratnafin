import { FC, useCallback, useEffect, useState, useContext } from "react";
import loaderGif from "assets/images/loader.gif";
import { useQuery, useMutation } from "react-query";
import { InitialValuesType, SubmitFnType } from "packages/form";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import Dialog from "@material-ui/core/Dialog";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { useSnackbar } from "notistack";
import { cloneDeep } from "lodash-es";
import { useLocation } from "react-router-dom";
import { useDialogStyles } from "pages_los/common/dialogStyles";
import { Transition } from "pages_los/common/transition";
import { ClearCacheProvider, ClearCacheContext, queryClient } from "cache";
import * as API from "./api";
import { coldCallingMetadata } from "../metadata";

interface updateColdCallingDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  tran_cd: string;
}

const updateColdCallingDataWrapperFn = (updateColdCallingData) => async ({
  data,
  tran_cd,
}: updateColdCallingDataType) => {
  return updateColdCallingData(data, tran_cd);
};

const ColdCallingViewEdit: FC<{
  moduleType: any;
  isDataChangedRef: any;
  closeDialog?: any;
  defaultView?: "view" | "edit";
  setEditFormStateFromInitValues?: any;
  readOnly?: boolean;
  tran_cd: string;
}> = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  defaultView = "view",
  readOnly = false,
  tran_cd,
  setEditFormStateFromInitValues,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formMode, setFormMode] = useState(defaultView);
  const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);

  const result = useQuery(["getColdCallingFormData", moduleType, tran_cd], () =>
    API.getColdCallingFormData({ moduleType })(tran_cd)
  );

  const mutation = useMutation(
    updateColdCallingDataWrapperFn(
      API.updateColdCallingFormData({
        moduleType,
        tran_cd,
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
        result.refetch();
        endSubmit(true, "");
        enqueueSnackbar("Cold Calling Update Successfully", {
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
      queryClient.removeQueries([
        "getColdCallingFormData",
        moduleType,
        tran_cd,
      ]);
    };
  }, [tran_cd]);

  const dataUniqueKey = `${result.dataUpdatedAt}`;
  const loading = result.isLoading || result.isFetching;
  let isError = result.isError;
  //@ts-ignore
  let errorMsg = `${result.error?.error_msg}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  let formEditData = result.data;

  let viewEditMetaData: MetaDataType = {} as MetaDataType;

  if (result.isSuccess) {
    const formStateFromInitValues =
      typeof setEditFormStateFromInitValues === "function"
        ? setEditFormStateFromInitValues(result.data)
        : undefined;
    viewEditMetaData = cloneDeep(coldCallingMetadata) as MetaDataType;

    viewEditMetaData.form.formState = {
      formCode: viewEditMetaData.form.name,
      ...formStateFromInitValues,
    };
    viewEditMetaData.form.name = `${viewEditMetaData.form.name}-edit`;
    if (viewEditMetaData?.form?.render?.renderType === "stepper") {
      viewEditMetaData.form.render.renderType = "tabs";
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
      <span>{errorMsg}</span>
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
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
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
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
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

export const ColdCallingEditViewWrapper: FC<any> = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  defaultView,
  readOnly,
  setEditFormStateFromInitValues,
  tran_cd,
}) => {
  const removeCache = useContext(ClearCacheContext);
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
      queryClient.removeQueries([
        "getColdCallingFormData",
        moduleType,
        tran_cd,
      ]);
    };
  }, []);
  return (
    <ColdCallingViewEdit
      moduleType={moduleType}
      isDataChangedRef={isDataChangedRef}
      closeDialog={closeDialog}
      defaultView={defaultView}
      setEditFormStateFromInitValues={setEditFormStateFromInitValues}
      readOnly={readOnly}
      tran_cd={tran_cd}
    />
  );
};

export const ColdCallingEditViewMetaWrapper = ({
  handleDialogClose,
  isDataChangedRef,
  moduleType,
}) => {
  const classes = useDialogStyles();
  const { state: rows }: any = useLocation();
  return (
    <ClearCacheProvider>
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
        maxWidth="lg"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <ColdCallingEditViewWrapper
          tran_cd={rows[0]?.id}
          moduleType={moduleType}
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
          readOnly={false}
        />
      </Dialog>
    </ClearCacheProvider>
  );
};
