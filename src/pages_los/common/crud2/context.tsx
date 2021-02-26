import { createContext, FC } from "react";

interface CRUDProviderType {
  context: any;
  insertFormData: CRUDFNType;
  checkFormDataExist: CRUDFNType;
  deleteFormData: CRUDFNType;
  updateFormData: CRUDFNType;
  getFormData: CRUDFNType;
  getGridFormData: CRUDFNType;
  getFormMetaData: CRUDFNType;
  getGridFormMetaData: CRUDFNType;
}

export const CRUDContext = createContext<CRUDProviderType>(
  {} as CRUDProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const CRUDContextProvider: FC<CRUDProviderType> = ({
  children,
  insertFormData,
  checkFormDataExist,
  deleteFormData,
  updateFormData,
  getFormData,
  getGridFormData,
  getFormMetaData,
  getGridFormMetaData,
  context,
}) => {
  return (
    <CRUDContext.Provider
      value={{
        context,
        insertFormData,
        checkFormDataExist,
        deleteFormData,
        updateFormData,
        getFormData,
        getGridFormData,
        getFormMetaData,
        getGridFormMetaData,
      }}
    >
      {children}
    </CRUDContext.Provider>
  );
};
