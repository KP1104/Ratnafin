import { forwardRef, Suspense, useImperativeHandle } from "react";
import DateFnsUtils from "@date-io/date-fns";
import Container from "@material-ui/core/Container";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FormContext, useForm } from "packages/form";
import { cloneDeep } from "lodash-es";
import { renderFieldsByGroup } from "./utils/groupWiserenderer";
import {
  constructInitialValue,
  constructInitialValuesForArrayFields,
} from "./utils/constructINITValues";
import { constructYupSchema } from "./utils/constructYupSchema";
import { attachMethodsToMetaData } from "./utils/attachMethodsToMetaData";
import { extendFieldTypes } from "./utils/extendedFieldTypes";
import { MoveSequenceToRender } from "./utils/fixSequenceInMetaData";
import { MetaDataType, FormWrapperProps } from "./types";
import { StepperWrapper } from "./stepperForm";
import { SimpleFormWrapper } from "./simpleForm";
import { TabsFormWrapper } from "./tabsForm";
import { extendedMetaData } from "./extendedTypes";
import { useStyles } from "./style";

export const FormWrapper = forwardRef<FormWrapperProps, any>(
  (
    {
      metaData: freshMetaData,
      initialValues,
      onSubmitHandler,
      hidden = false,
      disableGroupExclude,
      disableGroupErrorDetection,
      displayMode,
      hideTitleBar = false,
      hideDisplayModeInTitle = false,
      formStyle = {
        background: "white",
        height: "calc(100vh - 230px)",
        overflowY: "auto",
        overflowX: "hidden",
      },
      children,
    },
    ref
  ) => {
    //this line is very important to preserve our metaData across render - deep clone hack
    let metaData = cloneDeep(freshMetaData) as MetaDataType;
    //let metaData = JSON.parse(JSON.stringify(freshMetaData)) as MetaDataType;
    metaData = extendFieldTypes(metaData, extendedMetaData);
    metaData = attachMethodsToMetaData(metaData);
    metaData = MoveSequenceToRender(metaData);
    const groupWiseFields = renderFieldsByGroup(metaData);
    const initValues = constructInitialValue(metaData.fields, initialValues);
    const defaultArrayFieldInitValues = constructInitialValuesForArrayFields(
      metaData.fields
    );
    const yupValidationSchema = constructYupSchema(metaData.fields);
    const formName = metaData.form.name ?? "NO_NAME";
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormContext.Provider
          value={{
            formName: formName,
            resetFieldOnUnmount: Boolean(metaData.form.resetFieldOnUmnount),
            validationRun: metaData.form.validationRun,
            initialValues: initValues,
            defaultArrayFieldValues: defaultArrayFieldInitValues,
            validationSchema: yupValidationSchema,
            formState: {
              formCode: metaData.form.name,
              refID: metaData.form.refID,
              ...metaData.form?.formState,
            },
          }}
        >
          <ChildFormWrapper
            //@ts-ignore
            ref={ref}
            formName={formName}
            formDisplayLabel={metaData?.form?.label ?? "NO_LABEL"}
            formRenderType={metaData.form.render.renderType ?? "simple"}
            formRenderConfig={metaData.form.render}
            submitFn={onSubmitHandler}
            hidden={hidden}
            displayMode={displayMode}
            groupWiseFields={groupWiseFields}
            hideTitleBar={hideTitleBar}
            hideDisplayModeInTitle={hideDisplayModeInTitle}
            wrapperChild={children}
            formStyle={formStyle}
          />
        </FormContext.Provider>
      </MuiPickersUtilsProvider>
    );
  }
);

const ChildFormWrapper = forwardRef<any, any>(
  (
    {
      formName,
      formDisplayLabel,
      formRenderType,
      formRenderConfig,
      submitFn,
      hidden,
      displayMode,
      groupWiseFields,
      hideTitleBar,
      hideDisplayModeInTitle,
      wrapperChild,
      formStyle,
    },
    ref
  ) => {
    const {
      handleSubmit,
      handleSubmitPartial,
      serverSentError,
      serverSentErrorDetail,
      isSubmitting,
    } = useForm({
      onSubmit: submitFn,
      readOnly: displayMode === "view" ? true : false,
    });
    const classes = useStyles();
    //this is useful in cases where we want to merge this form with other forms, but we should handle form submission
    //and only get form values
    useImperativeHandle(ref, () => ({
      handleSubmit: handleSubmit,
      formDisplayLabel: formDisplayLabel,
    }));
    return formRenderType === "stepper" ? (
      <StepperWrapper
        key={`${formName}-grouped-stepper`}
        fields={groupWiseFields}
        formRenderConfig={formRenderConfig}
        formName={formName}
        handleSubmit={handleSubmit}
        handleSubmitPartial={handleSubmitPartial}
        formDisplayLabel={formDisplayLabel}
        hidden={hidden}
      />
    ) : formRenderType === "tabs" ? (
      <TabsFormWrapper
        key={`${formName}-grouped-tabs`}
        fields={groupWiseFields}
        formRenderConfig={formRenderConfig}
        formName={formName}
        formStyle={formStyle}
        formDisplayLabel={formDisplayLabel}
        hidden={hidden}
        displayMode={displayMode}
        hideDisplayModeInTitle={hideDisplayModeInTitle}
        wrapperChild={wrapperChild}
        serverSentError={serverSentError}
        serverSentErrorDetail={serverSentErrorDetail}
        isSubmitting={isSubmitting}
        classes={classes}
        handleSubmit={handleSubmit}
      >
        {({ steps }) => (
          <div>
            <br />
            <Suspense fallback={<div>Loading...</div>}>{steps}</Suspense>
          </div>
        )}
      </TabsFormWrapper>
    ) : formRenderType === "simple" ? (
      <SimpleFormWrapper
        formStyle={formStyle}
        fields={groupWiseFields}
        formRenderConfig={formRenderConfig}
        formName={formName}
        formDisplayLabel={formDisplayLabel}
        hidden={hidden}
        displayMode={displayMode}
        hideDisplayModeInTitle={hideDisplayModeInTitle}
        wrapperChild={wrapperChild}
        serverSentError={serverSentError}
        serverSentErrorDetail={serverSentErrorDetail}
        isSubmitting={isSubmitting}
        classes={classes}
        handleSubmit={handleSubmit}
      />
    ) : (
      <div>RenderType {formRenderType} not available</div>
    );
  }
);
