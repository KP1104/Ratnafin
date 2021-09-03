import { FC, useCallback, useEffect, useState, useContext } from "react";
import loaderGif from "assets/images/loader.gif";
import { InitialValuesType, SubmitFnType } from "packages/form";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import Dialog from "@material-ui/core/Dialog";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { useQuery, useMutation } from "react-query";
import { queryClient, ClearCacheContext, ClearCacheProvider } from "cache";
import { useSnackbar } from "notistack";
import { useDialogStyles } from "pages_los/common/dialogStyles";
import { Transition } from "pages_los/common/transition";
import { cloneDeep } from "lodash-es";
import { useLocation } from "react-router-dom";
import * as API from "./api";
import { taskEditViewMetadata } from "../metadata/form";

interface updateTaskDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
  taskID: string;
  refID: string;
}

const updateTaskDataWrapperFn = (updateTaskData) => async ({
  data,
  taskID,
}: updateTaskDataType) => {
  return updateTaskData(data, taskID);
};

const TaskViewEdit: FC<{
  moduleType: any;
  isDataChangedRef: any;
  closeDialog?: any;
  defaultView?: "view" | "edit";
  setEditFormStateFromInitValues?: any;
  readOnly?: boolean;
  disableCache?: boolean;
  taskID: string;
  inquiryFor: any;
  refID: any;
}> = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  defaultView = "view",
  readOnly = false,
  taskID,
  inquiryFor,
  setEditFormStateFromInitValues,
  refID,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formMode, setFormMode] = useState(defaultView);
  const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);

  const result = useQuery(["getTaskFormData", moduleType, taskID], () =>
    API.getTaskFormData({ moduleType })(taskID)
  );

  const mutation = useMutation(
    updateTaskDataWrapperFn(
      API.updateTaskFormData({
        moduleType,
        inquiry: refID,
        taskID: taskID,
        inquiryFor: inquiryFor,
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
        enqueueSnackbar("Task Update Successfully", {
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
    editViewMetaData = cloneDeep(taskEditViewMetadata) as MetaDataType;

    editViewMetaData.form.formState = {
      formCode: editViewMetaData.form.name,
      ...formStateFromInitValues,
    };
    editViewMetaData.form.name = `${editViewMetaData.form.name}-edit`;
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
      metaData={editViewMetaData as MetaDataType}
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
      metaData={editViewMetaData as MetaDataType}
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

export const ViewEditTaskWrapper: FC<any> = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  defaultView,
  readOnly,
  taskID,
  inquiryFor,
  setEditFormStateFromInitValues,
  refID,
}) => {
  const removeCache = useContext(ClearCacheContext);
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
      queryClient.removeQueries(["getTaskFormData", moduleType, taskID]);
    };
  }, []);
  return (
    <TaskViewEdit
      moduleType={moduleType}
      isDataChangedRef={isDataChangedRef}
      closeDialog={closeDialog}
      defaultView={defaultView}
      readOnly={readOnly}
      taskID={taskID}
      inquiryFor={inquiryFor}
      setEditFormStateFromInitValues={setEditFormStateFromInitValues}
      refID={refID}
    />
  );
};

export const ViewEditTaskMetaWrapper = ({
  handleDialogClose,
  isDataChangedRef,
  moduleType,
}) => {
  const { state: rows }: any = useLocation();
  const classes = useDialogStyles();
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
        maxWidth="sm"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <ViewEditTaskWrapper
          taskID={rows[0].id}
          inquiryFor={rows[0]?.data?.flag.toLocaleLowerCase()}
          refID={rows[0].data?.ref_id}
          moduleType={moduleType}
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
          readOnly={false}
          disableCache={false}
        />
      </Dialog>
    </ClearCacheProvider>
  );
};
