import { useState } from "react";
import { FormViewEdit } from "./formViewEdit";
import { FormNewExistsIfNotCreate } from "./formNewExistIfNotCreate";

export const SimpleCRUD = ({
  isProductEditedRef,
  closeDialog,
  formMetaData,
  dataAlwaysExists,
}) => {
  const [dataExist, setDataExist] = useState(Boolean(dataAlwaysExists));

  return dataExist ? (
    <FormViewEdit
      isProductEditedRef={isProductEditedRef}
      metaData={formMetaData}
      closeDialog={closeDialog}
    />
  ) : (
    <FormNewExistsIfNotCreate
      isProductEditedRef={isProductEditedRef}
      successAction={() => setDataExist(true)}
      metaData={formMetaData}
    />
  );
};
