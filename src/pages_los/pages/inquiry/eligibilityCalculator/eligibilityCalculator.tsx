import { FC } from "react";
import { useQuery } from "react-query";
import { cloneDeep } from "lodash-es";
import loaderGif from "assets/images/loader.gif";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import * as API from "./api";

export const EligibilityCalculator: FC<any> = ({
  employeentType,
  loanAmount,
  productId,
  employeeCode,
  setEditFormStateFromInitValues,
}) => {
  let initalValue = {
    ...{
      loanAmount: loanAmount,
      employementType: employeentType,
      employementCode: employeeCode,
    },
  };

  const result = useQuery(["getMetadata", employeeCode, productId], () =>
    API.getMetadata()(employeeCode, productId)
  );

  const dataUniqueKey = `${result.dataUpdatedAt}`;
  const loading = result.isLoading || result.isFetching;
  let isError = result.isError;
  //@ts-ignore
  let errorMsg = `${result.error?.error_msg ?? ""}`;
  errorMsg = Boolean(errorMsg.trim()) ? errorMsg : "Unknown error occured";

  let metaData: MetaDataType = {} as MetaDataType;

  if (result.isSuccess) {
    const formStateFromInitValues =
      typeof setEditFormStateFromInitValues === "function"
        ? setEditFormStateFromInitValues(result.data)
        : undefined;
    metaData = cloneDeep(result.data) as MetaDataType;

    metaData.form.formState = {
      formCode: metaData.form.name,
      ...formStateFromInitValues,
    };
    metaData.form.name = `${metaData.form.name}-edit`;
  }

  const renderResult = loading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : isError === true ? (
    <span>{errorMsg}</span>
  ) : (
    <FormWrapper
      key={`${dataUniqueKey}`}
      metaData={metaData as MetaDataType}
      initialValues={initalValue}
      onSubmitHandler={() => {}}
      //@ts-ignore
      displayMode={"new"}
      disableGroupErrorDetection={false}
    ></FormWrapper>
  );
  return renderResult;
};
