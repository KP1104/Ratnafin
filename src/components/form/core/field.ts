import * as React from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  form,
  formField,
  fieldRegisteryAdd,
  fieldRegisteryRemove,
  subscribeToFormFields,
} from "./atoms";

import { handleValidation } from "./util";

import { FormFieldAtom, FieldProps } from "./types";

export const useField = ({
  name,
  validate,
  dependentFields,
  arrayFieldName,
}: FieldProps) => {
  if ((arrayFieldName ?? "") === "") {
    arrayFieldName = name;
  }
  const formState = useRecoilValue(form);
  const [fieldData, setFieldData] = useRecoilState<FormFieldAtom>(
    formField(name)
  );
  const registerField = useSetRecoilState(fieldRegisteryAdd);
  const unregisterField = useSetRecoilState(fieldRegisteryRemove);
  const isValidationFn = typeof validate === "function" ? true : false;
  React.useEffect(() => {
    registerField(name);
    if (isValidationFn) {
      setFieldData({ ...fieldData, validate });
    }
    if (formState.resetFieldOnUnmount === true) {
      return () => unregisterField(name);
    }
  }, [name]);
  //change everytime arrayField renders this field will be used as new name
  React.useEffect(() => {
    setFieldData({
      ...fieldData,
      arrayFieldName,
    });
  }, [arrayFieldName]);
  const dependentValues = useRecoilValue(
    subscribeToFormFields(dependentFields)
  );

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValidationFn && formState.validationRun === "onChange") {
      try {
        const result = await Promise.resolve(
          handleValidation(fieldData, setValidationRunning)
        );
        if (typeof result === "string" || result === null) {
          setFieldData({
            ...fieldData,
            value,
            error: result,
          });
        }
      } catch (e) {
        setFieldData({ ...fieldData, value, error: e.message });
      }
    } else {
      setFieldData({ ...fieldData, value: value });
    }
  };

  const setValidationRunning = (value: boolean) => {
    setFieldData({
      ...fieldData,
      validationRunning: value,
    });
  };

  const handleBlur = async () => {
    if (isValidationFn && formState.validationRun === "onBlur") {
      try {
        const result = await Promise.resolve(
          handleValidation(fieldData, setValidationRunning)
        );
        if (typeof result === "string" || result === null) {
          setFieldData({ ...fieldData, touched: true, error: result });
        }
      } catch (e) {
        setFieldData({ ...fieldData, touched: true, error: e.message });
      }
    } else {
      setFieldData({ ...fieldData, touched: true });
    }
  };
  return {
    ...fieldData,
    isSubmitting: formState.isSubmitting,
    handleChange,
    handleBlur,
    setValidationRunning,
    dependentValues,
  };
};
