import { FC, useEffect, useRef } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import Grid, { GridProps } from "@material-ui/core/Grid";
import { TextField } from "components/styledComponent";
import { TextFieldProps } from "@material-ui/core/TextField";
import { transformDependentFieldsState } from "packages/form";
import { Merge } from "../types";

interface VisaversaProps {
  leftName: string;
  rightName: string;
  leftLabel: string;
  rightLabel: string;
  leftTransform: any;
  rightTransform: any;
  GridProps?: GridProps;
  enableGrid: boolean;
}

export type MyTextFieldAllProps = Merge<TextFieldProps, VisaversaProps>;

export type MyVisaversaProps = UseFieldHookProps & MyTextFieldAllProps;

const Visaversa: FC<MyVisaversaProps> = ({
  name: fieldName,
  fieldKey: fieldID,
  validate,
  leftName,
  rightName,
  leftLabel,
  rightLabel,
  leftTransform = (value) => value,
  rightTransform = (value) => value,
  GridProps,
  enableGrid,
  dependentFields,
  validationRun,
  runValidationOnDependentFieldsChange,
}) => {
  const {
    touched,
    value,
    error,
    setValue,
    handleBlur,
    isSubmitting,
    fieldKey,
    dependentValues,
  } = useField({
    name: fieldName,
    fieldKey: fieldID,
    validate,
    validationRun,
    dependentFields,
    runValidationOnDependentFieldsChange,
  });
  const leftValue = value[leftName];
  const rightValue = value[rightName];

  const leftValueRef = useRef<any>(leftValue);
  leftValueRef.current = leftValue;

  const rightValueRef = useRef<any>(rightValue);
  rightValueRef.current = rightValue;

  useEffect(() => {
    let newDependentValues = transformDependentFieldsState(dependentValues);

    let leftResult = leftTransform(
      leftValueRef.current,
      leftName,
      newDependentValues
    );
    let rightResult = rightTransform(
      rightValueRef.current,
      rightName,
      newDependentValues
    );
    if (leftResult === null && rightResult === null) {
      return;
    }
    setValue(
      { [leftName]: leftResult, [rightName]: rightResult },
      { [leftName]: leftResult, [rightName]: rightResult },
      true
    );
  }, [dependentValues]);

  const handleLeftChange = (e) => {
    let value = e.target.value;
    let result = rightTransform(
      value,
      rightName,
      transformDependentFieldsState(dependentValues)
    ).toFixed(2);
    setValue(
      { [leftName]: value, [rightName]: result },
      { [leftName]: value, [rightName]: result },
      true
    );
  };

  const handleRightChange = (e) => {
    let value = e.target.value;
    let result = leftTransform(
      value,
      leftName,
      transformDependentFieldsState(dependentValues)
    );
    setValue(
      { [leftName]: result, [rightName]: value },
      { [leftName]: result, [rightName]: value },
      true
    );
  };

  const isError = touched && (error ?? "") !== "";
  let result = (
    <div style={{ display: "flex" }} tabIndex={0} onBlur={handleBlur}>
      <TextField
        key={fieldKey}
        id={fieldKey}
        name={leftName}
        value={leftValue}
        label={leftLabel}
        onChange={handleLeftChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
        error={!isSubmitting && isError}
        helperText={!isSubmitting && isError ? error : ""}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        key={fieldKey}
        id={fieldKey}
        name={rightName}
        label={rightLabel}
        value={rightValue}
        onChange={handleRightChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
  if (Boolean(enableGrid)) {
    return <Grid {...GridProps}>{result}</Grid>;
  } else {
    return result;
  }
};

export default Visaversa;
