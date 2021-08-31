import { Fragment, useRef, useState } from "react";
import { RecoilRoot } from "recoil";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogAction from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert } from "components/common/alert";

import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { DocumentsPreviewWrapper } from "../docsPreview";
import { perfiosUploadInitiate } from "../api";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { useQuery } from "react-query";
import { LOSSDK } from "registry/fns/los";
import loaderGif from "assets/images/loader.gif";
import { BankAnalysisMetaData } from "./metaData";

interface InititateDocumentUploadAPIType {
  apiType: string;
  formData: any;
  refID: string;
  moduleType: string;
}

const InititateDocumentUploadAPI = (initiateDocsAPI) => async ({
  apiType,
  formData,
  refID,
  moduleType,
}: InititateDocumentUploadAPIType) => {
  return initiateDocsAPI(apiType, formData, refID, moduleType);
};
const APIInterface = ({ refID, moduleType, closeDialog, isDataChangedRef }) => {
  const apiType = "bank";
  const formState = { refID, moduleType };
  const formRef = useRef<any>(null);
  const endSubmitRef = useRef<any>(null);
  const formDataRef = useRef<any>(null);
  const [showDocs, setShowDocs] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const disabled = showDocs === true;

  const result = useQuery(
    ["getLoanAmountForDocumentsForAPICallInterface", formState],
    () => LOSSDK.getLoanAmountForDocumentsForAPICallInterface({ formState })
  );

  const inititateAPIMutation = useMutation(
    InititateDocumentUploadAPI(perfiosUploadInitiate),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        isDataChangedRef.current = true;
        enqueueSnackbar("API Successfully Initialized", {
          variant: "success",
        });
        closeDialog();
      },
    }
  );

  const cancel = () => {
    endSubmitRef.current(false);
    endSubmitRef.current = null;
    formDataRef.current = null;
    setShowDocs(false);
  };

  if (BankAnalysisMetaData?.form) {
    BankAnalysisMetaData.form.formState = formState;
  }
  const renderResult = result.isLoading ? (
    <img src={loaderGif} height="50px" width="50px" alt="loader" />
  ) : result.isError ? (
    <span>
      {
        //@ts-ignore
        result.error?.error_msg ?? "unknown error occured"
      }
    </span>
  ) : (
    <Fragment>
      <FormWrapper
        ref={formRef}
        metaData={BankAnalysisMetaData as MetaDataType}
        initialValues={{ loanAmount: result?.data }}
        onSubmitHandler={(data, displayData, endSubmit) => {
          endSubmitRef.current = endSubmit;
          formDataRef.current = data;
          setShowDocs(true);
        }}
        displayMode={"new"}
        hideTitleBar={false}
        hideDisplayModeInTitle={true}
      >
        <Button
          onClick={(e) => {
            formRef?.current?.handleSubmit?.(e);
          }}
          disabled={disabled}
          endIcon={disabled ? <CircularProgress size={20} /> : null}
        >
          Proceed
        </Button>
        <Button onClick={closeDialog} disabled={inititateAPIMutation.isLoading}>
          Close
        </Button>
      </FormWrapper>
      <Dialog
        open={showDocs}
        maxWidth="xl"
        PaperProps={{ style: { width: "100%", height: "100%" } }}
      >
        {inititateAPIMutation?.isError ? (
          <Alert
            severity="error"
            errorMsg={
              inititateAPIMutation.error?.error_msg ?? "Unknown error occured"
            }
            errorDetail={inititateAPIMutation.error?.error_detail ?? ""}
          />
        ) : null}
        <DialogAction style={{ display: "flex", padding: "8px 24px" }}>
          <Typography variant="h6" color="textSecondary">
            Bank Documents to be sent for Analysis
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Button
            onClick={() =>
              inititateAPIMutation.mutate({
                apiType,
                formData: formDataRef.current,
                refID,
                moduleType,
              })
            }
            disabled={inititateAPIMutation.isLoading}
            endIcon={
              inititateAPIMutation.isLoading ? (
                <CircularProgress size={20} />
              ) : null
            }
          >
            Initiate
          </Button>
          <Button
            onClick={() => cancel()}
            disabled={inititateAPIMutation.isLoading}
          >
            Cancel
          </Button>
        </DialogAction>
        <DialogContent>
          <DocumentsPreviewWrapper
            refID={refID}
            serialNo={formDataRef.current?.management}
            isManagement={Boolean(formDataRef.current?.management)}
            docCateg={[
              {
                label: "Add Documents",
                type: "bank",
                primary: true,
                categoryCD: "BANK_DOC_TYPE",
              },
            ]}
            transformData={(data) => {
              return data.filter((one) => {
                /*eslint-disable eqeqeq*/
                const result =
                  one?.bankLineID == formDataRef?.current?.bankLineID;
                return result;
              });
            }}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
  return renderResult;
};

export const BankAPIInterface = ({
  refID,
  moduleType,
  closeDialog,
  isDataChangedRef,
}) => {
  return (
    <RecoilRoot>
      <APIInterface
        refID={refID}
        moduleType={moduleType}
        closeDialog={closeDialog}
        isDataChangedRef={isDataChangedRef}
      />
    </RecoilRoot>
  );
};
