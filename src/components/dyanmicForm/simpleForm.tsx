import { FC, useRef, Suspense } from "react";
import Grid from "@material-ui/core/Grid";
import { FormProps } from "./types";
import Container from "@material-ui/core/Container";
import { Alert } from "components/common/alert";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

export const SimpleForm: FC<FormProps> = ({
  fields,
  formRenderConfig,
  children,
}) => {
  const fieldGroups = useRef<string[]>(Object.keys(fields).sort());
  const formComponentGroupWise = fieldGroups.current.map((one) => {
    const current = fields[one];
    return current.fields;
  });
  const fieldsToRender = formComponentGroupWise.reduce((one, accum) => {
    const newAccum = [...accum, ...one];
    return newAccum;
  }, []);

  return typeof children === "function" ? (
    children({
      fieldsToRender,
      spacing: formRenderConfig?.gridConfig?.container?.spacing ?? 2,
      direction: formRenderConfig?.gridConfig?.container?.direction ?? "row",
    })
  ) : (
    <Grid
      container={true}
      spacing={formRenderConfig?.gridConfig?.container?.spacing ?? 2}
      direction={formRenderConfig?.gridConfig?.container?.direction ?? "row"}
    >
      <Suspense fallback={<div>Loading...</div>}>{fieldsToRender}</Suspense>
    </Grid>
  );
};

export const SimpleFormWrapper = ({
  fields,
  formRenderConfig,
  formName,
  formStyle,
  hidden,
  formDisplayLabel,
  displayMode,
  hideDisplayModeInTitle,
  wrapperChild,
  serverSentError,
  serverSentErrorDetail,
  isSubmitting,
  classes,
  handleSubmit,
}) => (
  <Container component="main" style={{ display: hidden ? "none" : "block" }}>
    <SimpleFormTitle
      formDisplayLabel={formDisplayLabel}
      displayMode={displayMode}
      hideDisplayModeInTitle={hideDisplayModeInTitle}
      wrapperChild={wrapperChild}
      serverSentError={serverSentError}
      serverSentErrorDetail={serverSentErrorDetail}
      isSubmitting={isSubmitting}
      classes={classes}
      handleSubmit={handleSubmit}
    />
    <div style={{ ...formStyle, paddingTop: "10px" }}>
      {/* <div style={{ paddingTop: "10px" }}> */}
      <SimpleForm
        key={`${formName}-simple`}
        fields={fields}
        formRenderConfig={formRenderConfig}
        formName={formName}
      >
        {({ spacing, direction, fieldsToRender }) => (
          <div>
            <Grid container={true} spacing={spacing} direction={direction}>
              <Suspense fallback={<div>Loading...</div>}>
                {fieldsToRender}
              </Suspense>
            </Grid>
          </div>
        )}
      </SimpleForm>
    </div>
  </Container>
);

export const SimpleFormTitle = ({
  formDisplayLabel,
  displayMode,
  hideDisplayModeInTitle,
  wrapperChild,
  serverSentError,
  serverSentErrorDetail,
  isSubmitting,
  classes,
  handleSubmit,
}) => (
  <AppBar position="relative" color="secondary">
    <Toolbar variant="dense">
      <Typography component="div" variant="h6">
        {formDisplayLabel}
        {Boolean(displayMode) && !Boolean(hideDisplayModeInTitle) ? (
          <Chip
            style={{ color: "white", marginLeft: "8px" }}
            variant="outlined"
            color="primary"
            size="small"
            label={`${displayMode} mode`}
          />
        ) : (
          ""
        )}
      </Typography>
      <div className={classes.formControlLabelSpacer} />
      {typeof wrapperChild === "function"
        ? wrapperChild({ isSubmitting, handleSubmit })
        : wrapperChild}
    </Toolbar>
    {!isSubmitting && Boolean(serverSentError) ? (
      <Alert
        severity="error"
        errorMsg={serverSentError}
        errorDetail={serverSentErrorDetail}
      />
    ) : null}
  </AppBar>
);
