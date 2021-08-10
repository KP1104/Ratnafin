export type CellComponentType =
  | "textField"
  | "currency"
  | "rateOfInt"
  | "default";

export interface GridColumnType {
  accessor: string;
  columnName: string;
  alignment?: string;
  width?: number;
  maxWidth?: number;
  minWidth?: number;
  Cell?: any;
  footer?: boolean;
  defaultValue?: string | number;
  options?: any;
  displayStyle?: string;
  FormatProps?: any;
  ViseVersaProps?: any;
}
