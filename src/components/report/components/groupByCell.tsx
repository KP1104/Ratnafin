import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownSharpIcon from "@material-ui/icons/ArrowDropDownSharp";
import ArrowRightSharpIcon from "@material-ui/icons/ArrowRightSharp";

export const GroupByCell = ({ row, cell }) => {
  return (
    <>
      <IconButton
        {...row.getToggleRowExpandedProps([{ style: { padding: 0 } }])}
      >
        {row.isExpanded ? <ArrowDropDownSharpIcon /> : <ArrowRightSharpIcon />}
      </IconButton>
      {cell.render("Cell")}
    </>
  );
};
