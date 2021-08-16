import { useMemo } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <TextField
      value={filterValue ?? ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      fullWidth
      variant="outlined"
      size="small"
      select={true}
    >
      <MenuItem key="default" value="">
        All
      </MenuItem>
      {options.map((option: any, i) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};
