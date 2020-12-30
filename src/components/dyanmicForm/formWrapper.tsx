import { FC } from "react";
import DateFnsUtils from "@date-io/date-fns";
import Container from "@material-ui/core/Container";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FormContext, InitialValuesType, SubmitFnType } from "packages/form";
import { renderFieldsByGroup } from "./utils/groupWiserenderer";
import { constructInitialValue } from "./utils/constructINITValues";
import { constructYupSchema } from "./utils/constructYupSchema";
import { attachMethodsToMetaData } from "./utils/attachMethodsToMetaData";
import { singletonFunctionRegisrationFactory } from "./utils/functionRegistry";
import { extendFieldTypes } from "./utils/extendedFieldTypes";
import { MoveSequenceToRender } from "./utils/fixSequenceInMetaData";
import { MetaDataType } from "./types";
import { GroupedForm } from "./groupedForms";
import { SimpleForm } from "./simpleForm";
import { extendedMetaData } from "./extendedTypes";

interface FormWrapperProps {
  metaData: MetaDataType;
  initialValues?: InitialValuesType;
  onSubmitHandler: SubmitFnType;
  hidden?: boolean;
}

export const FormWrapper: FC<FormWrapperProps> = ({
  metaData,
  initialValues,
  onSubmitHandler,
  hidden = false,
}) => {
  metaData = extendFieldTypes(metaData, extendedMetaData);
  metaData = attachMethodsToMetaData(
    metaData,
    singletonFunctionRegisrationFactory
  );
  metaData = MoveSequenceToRender(metaData);
  const groupWiseFields = renderFieldsByGroup(metaData);
  const initValues = constructInitialValue(metaData.fields, initialValues);
  const yupValidationSchema = constructYupSchema(metaData.fields);

  const formRenderType = metaData.form.render.renderType ?? "simple";
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <FormContext.Provider
        value={{
          formName: metaData.form.name ?? "NO_NAME",
          resetFieldOnUnmount: Boolean(metaData.form.resetFieldOnUmnount),
          validationRun: metaData.form.validationRun,
          initialValues: initValues,
          validationSchema: yupValidationSchema,
          formState: {
            refID: metaData.form.refID,
            formCode: metaData.form.name,
          },
        }}
      >
        <Container
          component="main"
          style={{ display: hidden ? "none" : "block" }}
        >
          {formRenderType === "stepper" || formRenderType === "tabs" ? (
            <GroupedForm
              key={metaData.form.name}
              fields={groupWiseFields}
              formRenderConfig={metaData.form.render}
              formDisplayName={metaData.form.label}
              formName={metaData.form.name}
              submitFn={onSubmitHandler}
            />
          ) : formRenderType === "simple" ? (
            <SimpleForm
              key={metaData.form.name}
              fields={groupWiseFields}
              formRenderConfig={metaData.form.render}
              formDisplayName={metaData.form.label}
              formName={metaData.form.name}
              submitFn={onSubmitHandler}
            />
          ) : (
            <div>RenderType {formRenderType} not available</div>
          )}
        </Container>
      </FormContext.Provider>
    </MuiPickersUtilsProvider>
  );
};
