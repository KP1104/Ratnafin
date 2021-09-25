import { Fragment } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export const ListItemSelection = ({
  name,
  options,
  handleChange,
  value,
  label,
  loading,
  disabled = false,
  onlySingleSelect = false,
  disableSelectionFor = "",
  error,
  touched,
}) => {
  let isError = touched && Boolean(error);
  const handleToggle = (inputValue) => () => {
    if (!Array.isArray(value)) {
      handleChange({
        target: {
          name: name,
          value: [inputValue],
        },
      });
    } else {
      if (onlySingleSelect) {
        handleChange({
          target: {
            name: name,
            value: [inputValue],
          },
        });
        return;
      }
      let index = value.indexOf(inputValue);
      let newChecked = [...value];
      if (index >= 0) {
        newChecked.splice(index, 1);
        handleChange({
          target: {
            name: name,
            value: newChecked,
          },
        });
      } else {
        handleChange({
          target: {
            name: name,
            value: [...value, inputValue],
          },
        });
      }
    }
  };
  let result =
    Array.isArray(options) &&
    options.map((one) => {
      return (
        <ListItem
          key={one.value}
          button
          onClick={
            one.value === disableSelectionFor
              ? undefined
              : handleToggle(one.value)
          }
          disabled={disabled}
          dense={true}
          disableGutters
        >
          <ListItemIcon style={{ minWidth: "32px" }}>
            <Checkbox
              checked={value?.indexOf?.(one.value) >= 0}
              style={{ padding: "0px" }}
            />
          </ListItemIcon>
          <ListItemText primary={one.label} />
        </ListItem>
      );
    });
  return (
    <Fragment>
      <FormLabel
        disabled={disabled}
        filled
        style={{ fontWeight: 600 }}
        error={isError}
      >
        {label}
      </FormLabel>
      <List style={{ maxHeight: "250px ", overflow: "scroll" }}>{result}</List>
      <FormHelperText error={isError}>{error}</FormHelperText>
    </Fragment>
  );
};
