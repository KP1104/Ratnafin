import { useContext, useState, useEffect } from "react";
import { TextField } from "components/styledComponent";
import { RowContext } from "./rowContext";
import { DefaultCell } from "./defaultCell";

export const VisaversaCell = (props) => {
  const {
    column: { id: columnName, ViceVersaProps },
    row: { id },
    currentEditRow,
  } = props;

  if (currentEditRow === id) {
    return <Visaversa columnName={columnName} {...ViceVersaProps} />;
  } else {
    return <DefaultCell {...props} />;
  }
};

const defaultTransform = (value, dependentValue) => value;

export const Visaversa = ({
  columnName,
  rightTransform = defaultTransform,
  leftTransform = defaultTransform,
  defaultSide = "left",
  dependentField,
}) => {
  const {
    error,
    setCellValue,
    currentRow,
    touched,
    setCellTouched,
  } = useContext(RowContext);
  const [leftValue, setLeftValue] = useState("");
  const [rightValue, setRightValue] = useState("");

  const valueChange = defaultSide === "left" ? leftValue : rightValue;

  useEffect(() => {
    if (defaultSide === "left") {
      handleLeftChange(currentRow?.[columnName]);
      setCellTouched({ [columnName]: true });
    }
  }, []);

  useEffect(() => {
    setCellValue({ [columnName]: valueChange });
  }, [valueChange]);

  const handleLeftChange = (e) => {
    let value = e?.target?.value ?? e;
    let result = rightTransform(value, currentRow?.[dependentField]);
    setLeftValue(value);
    setRightValue(result);
  };

  const handleRightChange = (e) => {
    let value = e?.target?.value ?? e;
    let result = leftTransform(value, currentRow?.[dependentField]);
    setLeftValue(result);
    setRightValue(value);
  };

  return (
    <div style={{ display: "flex" }}>
      <TextField
        key="left"
        value={leftValue}
        onChange={handleLeftChange}
        helperText={touched?.[columnName] && error?.[columnName]}
        error={Boolean(touched?.[columnName]) && Boolean(error?.[columnName])}
      />
      <TextField key="right" value={rightValue} onChange={handleRightChange} />
    </div>
  );
};
