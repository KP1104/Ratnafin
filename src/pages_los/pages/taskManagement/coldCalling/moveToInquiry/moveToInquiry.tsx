import { FC, useEffect, useContext } from "react";
import loaderGif from "assets/images/loader.gif";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import Dialog from "@material-ui/core/Dialog";
import { useMutation, useQuery } from "react-query";
import { InitialValuesType, SubmitFnType } from "packages/form";
import { useSnackbar } from "notistack";
import { cloneDeep } from "lodash-es";
import { queryClient } from "cache";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { ClearCacheProvider, ClearCacheContext } from "cache";
import { useDialogStyles } from "pages_los/common/dialogStyles";
import { Transition } from "pages_los/common/transition";
import { useLocation } from "react-router-dom";
import { moveToInquiryMetaData } from "./metadata";
import * as API from "../coldCallingCRUD/api";
import * as API2 from "./api";

interface MoveToInquiryFnDataType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const moveToInquiryDataFnWrapper = (moveToInquiryFn) => async ({
  data,
}: MoveToInquiryFnDataType) => {
  return moveToInquiryFn(data);
};

const MoveToInquiry: FC<{
  moduleType: any;
  isDataChangedRef: any;
  closeDialog?: any;
  defaultView?: "edit";
  setEditFormStateFromInitValues?: any;
  readOnly?: boolean;
  disableCache?: boolean;
  tran_cd: any;
}> = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  defaultView,
  setEditFormStateFromInitValues,
  tran_cd,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const result = useQuery(["getColdCallingFormData", moduleType, tran_cd], () =>
    API.getColdCallingFormData({ moduleType })(tran_cd)
  );

  const mutation = useMutation(
    moveToInquiryDataFnWrapper(
      API2.moveColdCallingToInquiry({ moduleType, tranCD: tran_cd })
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
        enqueueSnackbar(
          `ColdCallingNo. ${tran_cd} moved to Inquiry with InquiryNo. ${data?.inquiryNo}`,
          {
            variant: "success",
          }
        );
        isDataChangedRef.current = true;
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

  let formEditData = result.data;
  let metaData: MetaDataType = {} as MetaDataType;

  if (result.isSuccess) {
    const formStateFromInitValues =
      typeof setEditFormStateFromInitValues === "function"
        ? setEditFormStateFromInitValues(result.data)
        : undefined;
    metaData = cloneDeep(moveToInquiryMetaData) as MetaDataType;

    metaData.form.formState = {
      formCode: metaData.form.name,
      ...formStateFromInitValues,
    };
    metaData.form.name = `${metaData.form.name}-edit`;
    if (metaData?.form?.render?.renderType === "stepper") {
      metaData.form.render.renderType = "tabs";
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
  ) : (
    <FormWrapper
      key={`${dataUniqueKey}-${defaultView}`}
      metaData={metaData as MetaDataType}
      initialValues={formEditData as InitialValuesType}
      onSubmitHandler={onSubmitHandler}
      //@ts-ignore
      displayMode={defaultView}
    >
      {({ isSubmitting, handleSubmit }) => (
        <>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            Move
          </Button>
          <Button onClick={closeDialog}>Cancel</Button>
        </>
      )}
    </FormWrapper>
  );
  return renderResult;
};

export const MoveToInquiryWrapper: FC<any> = ({
  moduleType,
  isDataChangedRef,
  closeDialog,
  defaultView,
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
    <MoveToInquiry
      moduleType={moduleType}
      isDataChangedRef={isDataChangedRef}
      closeDialog={closeDialog}
      tran_cd={tran_cd}
      defaultView={defaultView}
    />
  );
};

export const MoveToInquiryMetaWrapper = ({
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
        maxWidth="lg"
        classes={{
          scrollPaper: classes.topScrollPaper,
          paperScrollBody: classes.topPaperScrollBody,
        }}
      >
        <MoveToInquiryWrapper
          moduleType={moduleType}
          isDataChangedRef={isDataChangedRef}
          closeDialog={handleDialogClose}
          tran_cd={rows[0]?.id}
        />
      </Dialog>
    </ClearCacheProvider>
  );
};
