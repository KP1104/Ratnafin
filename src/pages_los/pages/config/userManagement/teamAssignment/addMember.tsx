import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import FormWrapper, { MetaDataType } from "components/dyanmicForm";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { teamMemberAddMetadata } from "./addMemberMetadata";
import * as API from "./api";
import { SubmitFnType } from "packages/form";
import { useDialogStyles } from "pages_los/common/dialogStyles";
import { useEffect, useContext } from "react";
import { queryClient, ClearCacheContext } from "cache";

const addTeamMemberWrapper = async ({
  data,
  userID,
  branchCode,
  endSubmit,
}) => {
  return API.addTeamMember(data, userID, branchCode);
};

export const AddMember = ({
  isDataChangedRef,
  closeDialog,
  userID,
  branchCode,
  userRole,
}) => {
  const removeCache = useContext(ClearCacheContext);
  const { enqueueSnackbar } = useSnackbar();
  const dialogClasses = useDialogStyles();
  const mutation = useMutation(addTeamMemberWrapper, {
    onError: (error: any, { endSubmit }) => {
      endSubmit(
        false,
        error?.error_msg ?? "Unknown Error occured",
        error?.error_details ?? ""
      );
    },
    onSuccess: (data, { endSubmit }) => {
      endSubmit(true, "");
      isDataChangedRef.current = true;
      enqueueSnackbar("New Member added Successfully", {
        variant: "success",
      });
      closeDialog();
    },
  });

  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, [removeCache]);

  const onSubmitHandler: SubmitFnType = (data, displayData, endSubmit) => {
    mutation.mutate({ data, userID, branchCode, endSubmit });
  };

  return (
    <Drawer
      open={true}
      anchor="right"
      variant="temporary"
      PaperProps={{
        style: { width: "350px" },
      }}
    >
      <FormWrapper
        key="teamMember"
        metaData={teamMemberAddMetadata as MetaDataType}
        initialValues={{}}
        onSubmitHandler={onSubmitHandler}
        displayMode={"new"}
        hideDisplayModeInTitle={true}
        controlsAtBottom={true}
        formStyle={{
          background: "white",
          overflowY: "auto",
          overflowX: "hidden",
        }}
        formState={{
          userID,
          branchCode,
          userRole,
        }}
      >
        {({ isSubmitting, handleSubmit }) => {
          return (
            <>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                endIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              >
                Save
              </Button>
              <Button onClick={closeDialog} disabled={isSubmitting}>
                Cancel
              </Button>
            </>
          );
        }}
      </FormWrapper>
    </Drawer>
  );
};
