import { useContext, useRef, useEffect } from "react";
import { TextField } from "components/styledComponent";
import { RowContext } from "./rowContext";
import NumberFormat from "react-number-format";
import Typography from "@material-ui/core/Typography";

let currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export const DefaultCellCurrency = ({ value }) => {
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

export const RateOfIntDefaultCell = ({ value }) => {
  return (
    <Typography
      component="span"
      variant="subtitle2"
      style={{ whiteSpace: "nowrap" }}
    >
      {`${value}%`}
    </Typography>
  );
};

export const VisaversaCell = (props) => {
  const {
    column: {
      //   id: columnName,
      leftName,
      rightName,
      rightTransform,
      leftTransform,
    },
    row: { id },
    currentEditRow,
  } = props;

  if (currentEditRow === id) {
    return (
      <Visaversa
        // columnName={columnName}
        leftName={leftName}
        rightName={rightName}
        rightTransform={rightTransform}
        leftTransform={leftTransform}
      />
    );
  } else {
    return (
      <>
        <DefaultCellCurrency {...props} />;
        <RateOfIntDefaultCell {...props} />;
      </>
    );
  }
};

function NumberFormatCustom(props) {
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

function PercentageFormatCustom(props) {
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

export const Visaversa = ({
  //   columnName,
  leftName,
  rightName,
  rightTransform,
  leftTransform,
}) => {
  const { setCellValue, currentRow } = useContext(RowContext);

  const handleLeftChange = (e) => {
    let value = e.target.value;
    console.log(value);
    let result = rightTransform(value, rightName, currentRow.amount);
    setCellValue({ [leftName]: value, [rightName]: result });
  };

  const handleRightChange = (e) => {
    let value = e.target.value;
    console.log(value);
    let result = leftTransform(value, leftName, currentRow.amount);
    setCellValue({ [leftName]: result, [rightName]: value });
  };

  return (
    <div style={{ display: "flex" }}>
      <TextField
        key="left"
        id={currentRow?.[leftName]}
        name={leftName}
        value={currentRow?.[leftName]}
        onChange={handleLeftChange}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          //@ts-ignore
          inputComponent: NumberFormatCustom,
          inputProps: {
            FormatProps: {
              thousandSeparator: true,
              prefix: "₹",
              thousandsGroupStyle: "lakh",
              allowNegative: true,
              allowLeadingZeros: false,
              decimalScale: 2,
              isAllowed: (values) => {
                if (values?.value?.length > 10) {
                  return false;
                }
                if (values.floatValue === 0) {
                  return false;
                }
                return true;
              },
            },
          },
        }}
      />
      <TextField
        key="right"
        id={currentRow?.[rightName]}
        name={rightName}
        value={currentRow?.[rightName]}
        onChange={handleRightChange}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          //@ts-ignore
          inputComponent: PercentageFormatCustom,
          inputProps: {
            FormatProps: {
              suffix: "%",
              decimalScale: 2,
              fixedDecimalScale: true,
              allowNegative: true,
              allowEmptyFormatting: true,
              isAllowed: (values) => {
                //@ts-ignore
                if (values.floatValue >= 999.99) {
                  return false;
                }
                return true;
              },
            },
          },
        }}
      />
    </div>
  );
};
