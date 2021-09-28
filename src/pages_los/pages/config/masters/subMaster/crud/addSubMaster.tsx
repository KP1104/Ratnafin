import { Fragment, useEffect } from "react";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { cloneDeep } from "lodash-es";
import { queryClient } from "cache";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import loaderGif from "assets/images/loader.gif";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { SubmitFnType } from "packages/form";
import { Transition } from "pages_los/common";
import { useDialogStyles } from "pages_los/common/dialogStyles";
import * as API from "../api";

interface addMasterDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const addMasterFormDataFnWrapper =
  (addMasterFn) =>
  async ({ data }: addMasterDataType) => {
    return addMasterFn(data);
  };

const AddMaster = ({ moduleType, isDataChangedRef, closeDialog, code }) => {
  const { enqueueSnackbar } = useSnackbar();

  const result = useQuery(["getFormDataMetadata", moduleType], () =>
    API.getFormMetaData({ moduleType })
  );

  useEffect(() => {
    return () => {
      queryClient.removeQueries(["getFormDataMetadata", moduleType]);
    };
  }, []);

  const mutation = useMutation(
    addMasterFormDataFnWrapper(API.insertBranchData({ moduleType, code })),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_details ?? "");
      },
      onSuccess: (data, { endSubmit }) => {
        endSubmit(true, "");
        isDataChangedRef.current = true;
        enqueueSnackbar("Added Successfully", {
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
    mutation.mutate({ data, displayData, endSubmit, setFieldError });
  };

  const dataUniqueKey = `${result.dataUpdatedAt}`;
  const loading = result.isLoading || result.isFetching;
  let isError = result.isError;
  //@ts-ignore
  let errorMsg = `${result.error?.error_msg}`;

  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";
  let metadata: MetaDataType = {} as MetaDataType;
  if (result.isSuccess) {
    metadata = cloneDeep(result?.data) as MetaDataType;
  }

  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : isError === true ? (
    <span>{errorMsg}</span>
  ) : (
    <FormWrapper
      key={dataUniqueKey}
      metaData={metadata as MetaDataType}
      initialValues={{}}
      onSubmitHandler={onSubmitHandler}
      displayMode={"new"}
      hideDisplayModeInTitle={true}
      controlsAtBottom={true}
      formStyle={{
        background: "white",
        overflowY: "auto",
        overflowX: "hidden",
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

  return renderResult;
};

export const AddSubMasterWrapper = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  code,
}) => {
  const classes = useDialogStyles();

  return (
    <Fragment>
      <Dialog
        open={true}
        maxWidth="sm"
        fullWidth
        //@ts-ignore
        TransitionComponent={Transition}
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <AddMaster
          moduleType={moduleType}
          isDataChangedRef={isDataChangedRef}
          closeDialog={closeDialog}
          code={code}
        />
      </Dialog>
    </Fragment>
  );
};
