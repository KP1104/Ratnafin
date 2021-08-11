import { useState, useContext } from "react";
import { SelectWithoutOptions } from "../../select/render2";
import { RowContext } from "./rowContext";
import Typography from "@material-ui/core/Typography";
import { getLabelFromValues, useOptionsFetcherSimple } from "../../utils";

export const SelectFieldCell = (props) => {
  const {
    column: { id: columnName, options, _optionsKey, multiple, showCheckbox },
    row: { id },
    currentEditRow,
  } = props;

  const [myOptions, setMyOptions] = useState([]);

  const { loadingOptions } = useOptionsFetcherSimple(
    options,
    setMyOptions,
    _optionsKey,
    false,
    {},
    false,
    undefined
  );

  if (currentEditRow === id) {
    return (
      <MySelectField
        key={columnName}
        columnName={columnName}
        options={myOptions}
        loadingOptions={loadingOptions}
        multiple={multiple}
        showCheckbox={showCheckbox}
      />
    );
  } else {
    return <RenderValue {...props} options={myOptions} />;
  }
};

export const MySelectField = ({
  columnName,
  options,
  loadingOptions,
  multiple,
  showCheckbox,
}) => {
  const {
    error,
    setCellValue,
    currentRow,
    setCellTouched,
    touched,
  } = useContext(RowContext);

  return (
    <SelectWithoutOptions
      value={currentRow?.[columnName]}
      error={error?.[columnName]}
      touched={touched?.[columnName]}
      size="small"
      variant="outlined"
      handleChange={(e) => {
        setCellValue({ [columnName]: e.target.value });
      }}
      handleBlur={() => setCellTouched({ [columnName]: true })}
      options={options}
      loadingOptions={loadingOptions}
      multiple={multiple}
      showCheckbox={showCheckbox}
      fullWidth
    />
  );
};

const RenderValue = ({ value, options }) => {
  return (
    <Typography
      component="span"
      variant="subtitle2"
      style={{ whiteSpace: "nowrap" }}
    >
      {getLabelFromValues(options, true)(value)}
    </Typography>
  );
};
