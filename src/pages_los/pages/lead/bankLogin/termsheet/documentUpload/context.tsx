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

export const DocAPICrudProviderGenerator = (tranCD) => ({
  context: {
    tranCD,
  },
  uploadDocuments: {
    fn: API.onFileUpload,
    args: { tranCD },
  },
  previewDocument: {
    fn: API.previewDocument,
    args: { tranCD },
  },
  documentIfExist: {
    fn: API.documentIfExist,
    args: { tranCD },
  },
});
