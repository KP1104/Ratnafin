import { useEffect, useContext, useState, useCallback, FC } from "react";
import loaderGif from "assets/images/loader.gif";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useSnackbar } from "notistack";
import { queryClient, ClearCacheContext } from "cache";
import { SubmitFnType } from "packages/form";
import { useMutation, useQueries } from "react-query";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { cloneDeep } from "lodash-es";
import * as API from "./api";
import { DocumentUploadTermsheet } from "../documentUpload";
import {
  DOCContextProvider,
  DocAPICrudProviderGenerator,
} from "../documentUpload/context";

interface SanctionFormDataFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const SanctionFormDataFnWrapper = (sanctionFn) => async ({
  data,
}: SanctionFormDataFnType) => {
  return sanctionFn(data);
};

const Sanction: FC<any> = ({
  moduleType,
  productType,
  refID,
  isDataChangedRef,
  product,
  branchID,
  readOnly,
  setEditFormStateFromInitValues,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const removeCache = useContext(ClearCacheContext);
  const [formMode, setFormMode] = useState("view");
  const moveToViewMode = useCallback(() => setFormMode("view"), [setFormMode]);
  const moveToEditMode = useCallback(() => setFormMode("edit"), [setFormMode]);

  const mutation = useMutation(
    SanctionFormDataFnWrapper(
      API.updateSanctionData({
        moduleType,
        refID,
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
        queryClient.refetchQueries(["getSanctionData", moduleType, refID]);
        endSubmit(true, "");
        enqueueSnackbar("Sanction Save Successfully", {
          variant: "success",
        });
        isDataChangedRef.current = true;
        moveToViewMode();
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
      queryClient.removeQueries(["getSanctionData", moduleType, refID]);
      queryClient.removeQueries(["getSanctionFormMetaData", product]);
    };
  }, [refID]);

  const result = useQueries([
    {
      queryKey: ["getSanctionData", moduleType, refID],
      queryFn: () => API.getSanctionData({ moduleType, refID })(branchID),
    },
    {
      queryKey: ["getSanctionFormMetaData", product],
      queryFn: () => API.getMetadata()(product),
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
  let errorMsg = `${result[0].error?.error_msg ?? ""}  ${
    //@ts-ignore
    result[1].error?.error_msg ?? ""
  }`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  let editMetaData: MetaDataType = {} as MetaDataType;
  let viewMetaData: MetaDataType = {} as MetaDataType;

  if (result[0].isSuccess || result[1].isSuccess) {
    const formStateFromInitValues =
      typeof setEditFormStateFromInitValues === "function"
        ? setEditFormStateFromInitValues(result[0].data)
        : undefined;
    editMetaData = cloneDeep(result[1].data) as MetaDataType;
    viewMetaData = cloneDeep(result[1].data) as MetaDataType;

    editMetaData.form.formState = {
      formCode: editMetaData.form.name,
      ...formStateFromInitValues,
    };
    editMetaData.form.name = `${editMetaData.form.name}-edit`;
    if (editMetaData?.form?.render?.renderType === "stepper") {
      editMetaData.form.render.renderType = "tabs";
    }
    viewMetaData.form.formState = {
      formCode: viewMetaData.form.name,
      ...formStateFromInitValues,
    };
    viewMetaData.form.name = `${viewMetaData.form.name}-view`;
    if (viewMetaData?.form?.render?.renderType === "stepper") {
      viewMetaData.form.render.renderType = "tabs";
    }
  }

  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : isError === true ? (
    <span>{errorMsg}</span>
  ) : formMode === "view" ? (
    <FormWrapper
      key={`${dataUniqueKey}-${formMode}`}
      metaData={viewMetaData as MetaDataType}
      initialValues={result[0].data}
      onSubmitHandler={onSubmitHandler}
      //@ts-ignore
      displayMode={formMode}
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
      {!readOnly ? <Button onClick={moveToEditMode}>Edit</Button> : null}
    </FormWrapper>
  ) : formMode === "edit" ? (
    <FormWrapper
      key={`${dataUniqueKey}-${formMode}`}
      metaData={editMetaData as MetaDataType}
      initialValues={result[0].data}
      onSubmitHandler={onSubmitHandler}
      //@ts-ignore
      displayMode={formMode}
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

export const SanctionWrapper = ({
  moduleType,
  productType,
  refID,
  isDataChangedRef,
  product,
  branchID,
  readOnly,
}) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={10} sm={10}>
          <Sanction
            moduleType={moduleType}
            productType={productType}
            refID={refID}
            isDataChangedRef={isDataChangedRef}
            product={product}
            branchID={branchID}
            readOnly={readOnly}
          />
        </Grid>
        <DOCContextProvider
          {...DocAPICrudProviderGenerator(refID, null, productType)}
        >
          <Grid item xs={12} md={2} sm={2}>
            <DocumentUploadTermsheet
              branchID={branchID}
              isDataChangedRef={isDataChangedRef}
            />
          </Grid>
        </DOCContextProvider>
      </Grid>
    </>
  );
};
