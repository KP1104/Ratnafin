import { useContext } from "react";
import { NumberFormatCustom } from "components/derived/numberFormat";
import { TextFieldForSelect as TextField } from "components/styledComponent/textfield";
import { RowContext } from "./rowContext";
import Typography from "@material-ui/core/Typography";

let currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export const DisplayCell = ({ value, displayStyle }) => {
  let finalNode;
  switch (displayStyle) {
    case "currency":
      finalNode = currencyFormatter.format(value);
      break;
    case "percentage":
      finalNode = `${value}%`;
      break;
    default:
      finalNode = value;
  }
  console.log(displayStyle, finalNode);
  return (
    <Typography
      component="span"
      variant="subtitle2"
      style={{ whiteSpace: "nowrap" }}
    >
      {finalNode}
    </Typography>
  );
};

export const NumberCell = (props) => {
  const {
    column: { id: columnName, FormatProps, formattedValue, displayStyle },
    row: { id },
    currentEditRow,
  } = props;
  if (currentEditRow === id) {
    return (
      <CurrencyInput
        key={columnName}
        columnName={columnName}
        FormatProps={FormatProps}
        formattedValue={formattedValue}
      />
    );
  } else {
    return <DisplayCell {...props} displayStyle={displayStyle} />;
  }
};

export const CurrencyInput = ({ columnName, FormatProps, formattedValue }) => {
  const {
    error,
    setCellValue,
    currentRow,
    touched,
    setCellTouched,
  } = useContext(RowContext);

  return (
    <TextField
      value={currentRow?.[columnName]}
      onChange={(e) => setCellValue({ [columnName]: e.target.value })}
      helperText={touched?.[columnName] && error?.[columnName]}
      error={Boolean(touched?.[columnName]) && Boolean(error?.[columnName])}
      onBlur={() => setCellTouched({ [columnName]: true })}
      InputLabelProps={{ shrink: true }}
      size="small"
      fullWidth
      margin="none"
      InputProps={{
        //@ts-ignore
        inputComponent: NumberFormatCustom,
        inputProps: {
          FormatProps: { ...FormatProps, formattedValue },
        },
      }}
    />
  );
};
