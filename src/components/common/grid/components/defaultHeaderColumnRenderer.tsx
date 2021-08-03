import { useRef } from "react";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { useDrag, useDrop } from "react-dnd";

export const DefaultHeaderColumnRenderer = ({ column }) => {
  return (
    <>
      <span
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          paddingRight: "10px",
        }}
      >
        {column.columnName}
      </span>

      <div
        {...column.getResizerProps([
          {
            style: {
              display: "inline-block",
              position: "absolute",
              right: "-5px",
              top: "0",
              padding: "0 5px",
              zIndex: 1,
            },
          },
        ])}
      >
        <div
          style={{
            height: "35px",
            width: "6px",
            backgroundColor: "#888",
          }}
        ></div>
      </div>
    </>
  );
};
