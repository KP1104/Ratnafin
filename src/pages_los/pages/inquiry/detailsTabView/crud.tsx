import { lazy, FC } from "react";
import { CRUDContextProvider, crudAPIContextGenerator } from "pages_los/common";
import * as API from "./api";

const SimpleCRUD = lazy(() =>
  import("pages_los/common/crud2").then((module) => ({
    default: module.SimpleCRUD,
  }))
);

interface CRUDTYPE {
  moduleType: string;
  productType: string;
  refID: string;
  isDataChangedRef: any;
  dataAlwaysExists: boolean;
  readOnly?: boolean;
  productID?: string;
}

export const CRUD: FC<CRUDTYPE> = ({
  moduleType,
  productType,
  refID,
  isDataChangedRef,
  dataAlwaysExists,
  readOnly,
  productID,
}) => {
  return (
    <CRUDContextProvider
      {...{
        ...crudAPIContextGenerator(moduleType, productType, refID),
        getFormMetaData: {
          fn: API.getFormMetaData,
          args: { moduleType, productType, refID, productID },
        },
      }}
    >
      <SimpleCRUD
        isDataChangedRef={isDataChangedRef}
        dataAlwaysExists={dataAlwaysExists}
        readOnly={readOnly}
      />
    </CRUDContextProvider>
  );
};
