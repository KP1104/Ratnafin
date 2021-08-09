import { useState, useContext } from "react";
import NumberFormat from "react-number-format";
import { TextFieldForSelect as TextField } from "components/styledComponent/textfield";
import { RowContext } from "./rowContext";
import Typography from "@material-ui/core/Typography";

let currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export const DefaultCell = ({ value }) => {
  return (
    <Typography
      component="span"
      variant="subtitle2"
      style={{ whiteSpace: "nowrap" }}
    >
      {`${currencyFormatter.format(value)}`}
    </Typography>
  );
};

export const CurrencyCell = (props) => {
  const {
    column: { id: columnName, formatProps },
    row: { id },
    currentEditRow,
  } = props;
  if (currentEditRow === id) {
    return (
      <MyCurrency
        key={columnName}
        columnName={columnName}
        formatProps={formatProps}
      />
    );
  } else {
    return <DefaultCell {...props} />;
  }
};

function CurrencyFormat(props) {
  const { inputRef, onChange, FormatProps, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange(
          {
            target: {
              name: props.name,
              value: values.value,
              formattedValue: values.formattedValue,
            },
          },
          values.formattedValue
        );
      }}
      {...FormatProps}
    />
  );
}

export const MyCurrency = ({ columnName, formatProps }) => {
  const { error, setCellValue, currentRow } = useContext(RowContext);
  const [touched, setTouched] = useState(false);

  return (
    <TextField
      value={currentRow?.[columnName]}
      onChange={(e) => setCellValue({ [columnName]: e.target.value })}
      onBlur={() => setTouched(true)}
      InputLabelProps={{ shrink: true }}
      size="small"
      fullWidth
      margin="none"
      helperText={touched && error?.[columnName]}
      error={touched && Boolean(error?.[columnName])}
      InputProps={{
        //@ts-ignore
        inputComponent: CurrencyFormat,
        inputProps: {
          FormatProps: formatProps,
        },
      }}
    />
  );
};
