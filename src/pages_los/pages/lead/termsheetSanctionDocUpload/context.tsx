import { createContext, FC } from "react";
import * as API from "./api";

interface DOCProviderType {
  context: any;
  uploadDocuments: CRUDFNType;
  previewDocument: CRUDFNType;
  documentIfExist: CRUDFNType;
}

export const DOCContext = createContext<DOCProviderType>({} as DOCProviderType);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const DOCContextProvider: FC<DOCProviderType> = ({
  children,
  uploadDocuments,
  previewDocument,
  documentIfExist,
  context,
}) => {
  return (
    <DOCContext.Provider
      value={{
        uploadDocuments,
        previewDocument,
        documentIfExist,
        context,
      }}
    >
      {children}
    </DOCContext.Provider>
  );
};

export const DocAPICrudProviderGenerator = (refID, tranCD, moduleType) => ({
  context: {
    tranCD,
    refID,
    moduleType,
  },
  uploadDocuments: {
    fn: API.onFileUpload,
    args: { refID, tranCD, moduleType },
  },
  previewDocument: {
    fn: API.previewDocument,
    args: { refID, tranCD, moduleType },
  },
  documentIfExist: {
    fn: API.documentIfExist,
    args: { refID, tranCD, moduleType },
  },
});
