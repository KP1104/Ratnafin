export type CellComponentType =
  | "textField"
  | "currency"
  | "rateOfInt"
  | "default";

export interface GridColumnType {
  accessor: string;
  alignment?: string;
  width?: number;
  maxWidth?: number;
  minWidth?: number;
  Cell?: any;
  columnName?: string;
  footer?: boolean;
  defaultValue?: string | number;
  options?: any;
  formatProps?: any;

  //visaversa
  leftName?: string;
  rightName?: string;
  leftLabel?: string;
  rightLabel?: string;
  leftTransform?: any;
  rightTransform?: any;
}
