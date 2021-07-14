import { FC, useState, useEffect, useContext } from "react";
import loaderGif from "assets/images/loader.gif";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import { queryClient, ClearCacheContext } from "cache";
import { SubmitFnType } from "packages/form";
import { useMutation, useQueries } from "react-query";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { cloneDeep } from "lodash-es";
import * as API from "./api";

interface TermsheetFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const TermsheetFormDataFnWrapper = (termsheetFn) => async ({
  data,
}: TermsheetFormDataFnType) => {
  return termsheetFn(data);
};

export const Termsheet: FC<{
  refID: any;
  branchID: any;
  isDataChangedRef: any;
  closeDialog?: any;
  setEditFormStateFromInitValues?: any;
  readOnly?: boolean;
  category: any;
  defaultView?: "view" | "edit";
  bankName: any;
}> = ({
  defaultView = "edit",
  refID,
  isDataChangedRef,
  closeDialog,
  setEditFormStateFromInitValues,
  branchID,
  category,
  bankName,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const removeCache = useContext(ClearCacheContext);
  const [formMode, setFormMode] = useState(defaultView);

  const mutation = useMutation(
    TermsheetFormDataFnWrapper(API.updateTermsheetData()),
    {
      onError: (error: any, { endSubmit }) => {
        let errorMsg = "Unknown Error occured";
        if (typeof error === "object") {
          errorMsg = error?.error_msg ?? errorMsg;
        }
        endSubmit(false, errorMsg, error?.error_detail ?? "");
      },
      onSuccess: (data, { endSubmit }) => {
        queryClient.refetchQueries(["getTermsheetFormData", refID]);
        endSubmit(true, "");
        enqueueSnackbar("Termsheet Save Successfully", {
          variant: "success",
        });
        isDataChangedRef.current = true;
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

  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
      queryClient.removeQueries(["getTermsheetFormData", refID, branchID]);
    };
  }, [refID]);

  const result = useQueries([
    {
      queryKey: ["getTermsheetFormData", refID, branchID],
      queryFn: () => API.getTermsheetData({ refID, branchID }),
    },
    {
      queryKey: ["getTermsheetFormMetaData", category],
      queryFn: () => API.getMetadata()(category),
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
  let errorMsg = `${result[0].error?.error_msg ?? ""} ${
    //@ts-ignore
    result[1].error?.error_msg ?? ""
  }`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  let formEditData: any = result[0].data;

  let editViewMetaData: MetaDataType = {} as MetaDataType;

  if (result[0].isSuccess || result[1].isSuccess) {
    const formStateFromInitValues =
      typeof setEditFormStateFromInitValues === "function"
        ? setEditFormStateFromInitValues(result[0].data)
        : undefined;
    editViewMetaData = cloneDeep(result[1].data) as MetaDataType;

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
  ) : formMode === "edit" ? (
    <FormWrapper
      key={`${dataUniqueKey}-${formMode}`}
      metaData={editViewMetaData as MetaDataType}
      initialValues={{ ...formEditData, bankName: bankName } ?? ""}
      onSubmitHandler={onSubmitHandler}
      //@ts-ignore
      displayMode={formMode}
      disableGroupErrorDetection={false}
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
        </>
      )}
    </FormWrapper>
  ) : null;
  return renderResult;
};
