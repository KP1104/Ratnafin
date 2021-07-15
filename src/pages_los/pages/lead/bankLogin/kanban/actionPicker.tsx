import { BankSelection, BankSanction } from "../bankSelection";

export const ActionPicker = ({
  currentAction,
  closeDialog,
  dataChangedRef,
}) => {
  return currentAction?.name === "addBank" ? (
    <BankSelection
      refID={currentAction?.refID}
      closeDialog={closeDialog}
      isDataChangedRef={dataChangedRef}
    />
  ) : currentAction?.name === "sanction" ? (
    <BankSanction
      refID={currentAction?.refID}
      closeDialog={closeDialog}
      isDataChangedRef={dataChangedRef}
    />
  ) : null;
};
