import { useContext, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { RowContext } from "./rowContext";
import { DefaultCell } from "./defaultCell";

export const VisaversaCell = (props) => {
  const {
    column: { id: columnName, ViceVersaProps, clearFields },
    row: { id },
    currentEditRow,
  } = props;

  if (currentEditRow === id) {
    return (
      <Visaversa
        columnName={columnName}
        clearFields={clearFields}
        {...ViceVersaProps}
      />
    );
  } else {
    return <DefaultCell {...props} />;
  }
};

const defaultTransform = (value, dependentValue) => value;

export const Visaversa = ({
  columnName,
  rightTransform = defaultTransform,
  leftTransform = defaultTransform,
  leftAdornment = "",
  rightAdornment = "",
  dependentField,
  clearFields,
}) => {
  const {
    error,
    setCellValue,
    currentRow,
    touched,
    setCellTouched,
  } = useContext(RowContext);
  const [computedValue, setComputedValue] = useState("");

  useEffect(() => {
    let result = rightTransform(
      currentRow?.[columnName],
      currentRow?.[dependentField]
    );
    setComputedValue(result);
    setCellTouched({ [columnName]: true });
  }, []);

  let cellValue = currentRow?.[columnName];
  console.log(cellValue);

  useEffect(() => {
    if (cellValue === "") {
      setComputedValue("");
    }
  }, [cellValue]);

  const handleLeftChange = (e) => {
    let value = e?.target?.value ?? e;
    let result = rightTransform(
      currentRow?.[columnName],
      currentRow?.[dependentField]
    );
    setCellValue({ [columnName]: value });
    setComputedValue(result);
  };

  const handleRightChange = (e) => {
    let value = e?.target?.value ?? e;
    let result = leftTransform(value, currentRow?.[dependentField]);
    setCellValue({ [columnName]: result });
    setComputedValue(value);
  };

  return (
    <div style={{ display: "flex" }}>
      <TextField
        key="left"
        value={currentRow?.[columnName]}
        onChange={handleLeftChange}
        helperText={touched?.[columnName] && error?.[columnName]}
        error={Boolean(touched?.[columnName]) && Boolean(error?.[columnName])}
        size="small"
        variant="outlined"
        InputProps={{
          endAdornment: Boolean(leftAdornment) && (
            <InputAdornment position="end">{leftAdornment}</InputAdornment>
          ),
        }}
        fullWidth
      />
      <div style={{ padding: "0px 4px" }} />
      <TextField
        key="right"
        value={computedValue}
        onChange={handleRightChange}
        size="small"
        variant="outlined"
        InputProps={{
          endAdornment: Boolean(rightAdornment) && (
            <InputAdornment position="end">{rightAdornment}</InputAdornment>
          ),
        }}
        fullWidth
      />
    </div>
  );
};
