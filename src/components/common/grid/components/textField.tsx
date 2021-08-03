import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export const EditableTextField = (props) => {
  const {
    column: { id: columnName },
    row: { id },
    currentEditRow,
    handleCurrentRowCellChange,
    value,
  } = props;
  if (currentEditRow === id) {
    return (
      <MyTextField
        key={value}
        value={value}
        handleCurrentRowCellChange={handleCurrentRowCellChange}
        columnName={columnName}
      />
    );
  } else {
    return (
      <Typography
        component="span"
        variant="subtitle2"
        style={{ whiteSpace: "nowrap" }}
      >
        {value}
      </Typography>
    );
  }
};

export const MyTextField = ({
  value,
  handleCurrentRowCellChange,
  columnName,
}) => {
  const [currentValue, setCurrentValue] = useState(value ?? "");
  return (
    <TextField
      type="text"
      value={currentValue}
      size="small"
      variant="outlined"
      onChange={(e) => setCurrentValue(e.target.value)}
      onBlur={() => handleCurrentRowCellChange({ [columnName]: currentValue })}
    />
  );
};
