import { useMemo, FC, useState, useCallback, useRef, Fragment } from "react";
import {
  useTable,
  useRowSelect,
  useBlockLayout,
  useResizeColumns,
} from "react-table";
import * as yup from "yup";
import { useMutation } from "react-query";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Alert } from "components/common/alert";
import { setIn } from "packages/form";
import metaData from "./metaData";
import { useCheckboxColumn } from "./components/useCheckbox";
import { RowContextProvider } from "./components/rowContext";
import { useSnackbar } from "notistack";

const emptyTransformer = (data) => data;

const MYTable: FC<{
  columns: any;
  data: any;
  dataIdColumn: any;
  newRowObj?: any;
  rowValidator?: any;
  dataTransformer?: any;
}> = ({
  columns,
  data = [],
  newRowObj,
  dataIdColumn,
  rowValidator,
  dataTransformer = emptyTransformer,
}) => {
  const rowIDColumn = "__id";
  const incrCounter = useRef(-1);
  const myColumns = useMemo(() => columns, []);
  const [myData, setMyData] = useState(() =>
    dataTransformer(
      data.map((one) => ({ ...one, [rowIDColumn]: ++incrCounter.current }))
    )
  );

  const setMyDataWrapper = useCallback(
    (value) => {
      if (typeof value === "function") {
        setMyData((old) => {
          let result = value(old);
          result = dataTransformer(result);
          return result;
        });
      } else {
        let result = dataTransformer(value);
        setMyData(result);
      }
    },
    [setMyData, dataTransformer]
  );
  const currentRowObj = useRef({});
  const currentRowError = useRef({});
  const [currentEditRow, setCurrentEditRow] = useState(-1);
  const [newRowAdded, setNewRowAdded] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const rowContainerRef = useRef<HTMLDivElement | null>(null);

  const getRowId = useCallback((data) => data[rowIDColumn], []);

  const closeDialog = useCallback(() => {
    setShowDialog(false);
  }, [setShowDialog]);

  const addNewRow = useCallback(() => {
    if (!newRowAdded) {
      setMyDataWrapper((old) => [
        ...old,
        {
          ...newRowObj,
          [rowIDColumn]: ++incrCounter.current,
        },
      ]);

      setNewRowAdded(true);
      setCurrentEditRow(incrCounter.current);
      currentRowObj.current = {};
      setTimeout(() => {
        let elem = rowContainerRef.current;
        elem?.scrollTo({
          behavior: "smooth",
          top: elem.scrollHeight - elem.offsetHeight,
          left: 0,
        });
      }, 1);
    }
  }, [
    setMyDataWrapper,
    setNewRowAdded,
    setCurrentEditRow,
    newRowAdded,
    myData,
  ]);

  const saveCurrentRow = useCallback(
    (index) => {
      if (Object.keys(currentRowError.current).length > 0) {
        return false;
      }
      let newData = myData.map((one) => {
        if (getRowId(one) === index) {
          return { ...one, ...currentRowObj.current };
        }
        return one;
      });
      setMyDataWrapper(newData);
      setCurrentEditRow(-1);
      setNewRowAdded(false);
      currentRowObj.current = {};
      return true;
    },
    [setMyDataWrapper, setNewRowAdded, setCurrentEditRow, myData, getRowId]
  );

  const cancelCurrentRowEdit = useCallback(
    (index) => {
      if (newRowAdded) {
        setMyDataWrapper((old) =>
          old.filter((one) => !(getRowId(one) === index))
        );
      }
      setCurrentEditRow(-1);
      setNewRowAdded(false);
      currentRowObj.current = {};
      currentRowError.current = {};
    },
    [setMyDataWrapper, setCurrentEditRow, setNewRowAdded, newRowAdded]
  );

  const requestRowEdit = useCallback(
    (index) => {
      if (newRowAdded || Object.keys(currentRowError.current).length > 0) {
        return;
      }
      if (currentEditRow === -1) {
        setCurrentEditRow(index);
      } else {
        // let success = saveCurrentRow(currentEditRow);
        // if (success) {
        //   setCurrentEditRow(index);
        // }
        cancelCurrentRowEdit(currentEditRow);
        setCurrentEditRow(index);
      }
      currentRowObj.current = {};
    },
    [saveCurrentRow, setCurrentEditRow, currentEditRow, newRowAdded]
  );

  const tableProps = useTable(
    {
      columns: myColumns.columns,
      data: myData,
      requestRowEdit,
      currentEditRow,
      getRowId,
      saveCurrentRow,
      cancelCurrentRowEdit,
    },
    useRowSelect,
    useResizeColumns,
    useBlockLayout,
    useCheckboxColumn(true)
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
    selectedFlatRows,
  } = tableProps;

  return (
    <Fragment>
      <Paper
        style={{
          width: `${totalColumnsWidth}px`,
          maxWidth: "750px",
          overflow: "hidden",
        }}
      >
        <Toolbar
          variant="dense"
          style={{
            display: "flex",
            minHeight: "40px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Typography variant="h6">Hello</Typography>
          <div style={{ flexGrow: 1 }} />
          {selectedFlatRows.length > 0 ? (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setShowDialog(true);
              }}
            >
              Delete
            </Button>
          ) : null}
        </Toolbar>
        <TableContainer>
          <Table {...getTableProps()} size="small" component="div">
            <TableHead component="div">
              {headerGroups.map((headerGroup) => (
                <TableRow
                  {...headerGroup.getHeaderGroupProps()}
                  component="div"
                >
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      {...column.getHeaderProps([
                        {
                          style: { textAlign: column?.alignment ?? "unset" },
                        },
                      ])}
                      component="div"
                    >
                      {column.render("Header")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps({})} component="div">
              <div
                style={{ overflow: "scroll", maxHeight: "200px" }}
                ref={rowContainerRef}
              >
                {rows.map((row, i) => {
                  prepareRow(row);
                  const rowProps = row.getRowProps();
                  const renderRow = (
                    <TableRow {...rowProps} component="div">
                      {row.cells.map((cell) => {
                        return (
                          <TableCell
                            {...cell.getCellProps([
                              {
                                style: {
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                  textAlign: cell?.column?.alignment ?? "unset",
                                },
                              },
                            ])}
                            component="div"
                          >
                            {cell.render("Cell")}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                  if (currentEditRow === row.id) {
                    return (
                      <RowContextProvider
                        currentRowError={currentRowError}
                        currentRowObj={currentRowObj}
                        key={`${rowProps.key}_row_with_context`}
                        initialData={row.original}
                        rowValidator={rowValidator}
                      >
                        {renderRow}
                      </RowContextProvider>
                    );
                  } else {
                    return renderRow;
                  }
                })}
              </div>
            </TableBody>
            <TableHead component="div">
              {footerGroups.map((footerGroup) => (
                <TableRow
                  {...footerGroup.getFooterGroupProps()}
                  component="div"
                >
                  {footerGroup.headers.map((column) => (
                    <TableCell
                      {...column.getFooterProps([
                        {
                          style: { textAlign: column?.alignment ?? "unset" },
                        },
                      ])}
                      component="div"
                    >
                      {column.render("Footer")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
          </Table>
        </TableContainer>
      </Paper>
      <Button onClick={addNewRow}>AddRow</Button>
      <DeleteRows
        selectedRows={selectedFlatRows}
        dataIdColumn={dataIdColumn}
        open={showDialog}
        closeDialog={closeDialog}
      />
    </Fragment>
  );
};

interface DeleteRowsFnType {
  data: object;
  displayData?: object;
  endSubmit?: any;
  setFieldError?: any;
}

const deleteRowsFnWrapper = (deleteRowsFn) => async ({
  data,
}: DeleteRowsFnType) => {
  return deleteRowsFn(data);
};

const DeleteRows = ({
  selectedRows,
  dataIdColumn,
  deleteFn = async () => {
    throw new Error("deleteFn not defined");
  },
  open,
  closeDialog,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const closeWrapper = () => {
    mutation.reset();
    closeDialog();
  };
  const mutation = useMutation<any, any, any, any>(
    deleteRowsFnWrapper(deleteFn),
    {
      onSuccess: () => {
        enqueueSnackbar("data successfully deleted", {
          variant: "success",
        });
        closeWrapper();
      },
    }
  );

  const deleteData = () => {
    let result = selectedRows.map(
      (one) => one?.original?.[dataIdColumn] ?? false
    );
    let existingRecords = result.filter((one) => one !== false);
    mutation.mutate(existingRecords);
  };

  return (
    <Dialog open={open}>
      {mutation.isError ? (
        <Alert
          severity="error"
          errorMsg={mutation.error?.error_msg ?? "Unknown error occured"}
          errorDetail={mutation.error?.error_detail ?? ""}
        />
      ) : null}
      <DialogTitle>Would you like to delete the selected records </DialogTitle>
      <DialogActions>
        <Button onClick={deleteData} disabled={mutation.isLoading}>
          Yes
        </Button>
        <Button onClick={closeWrapper} disabled={mutation.isLoading}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const App = () => {
  return (
    <MYTable
      columns={metaData}
      data={[
        { myId: 1, name: "Devarsh", age: 31 },
        { myId: 2, name: "Dvija", age: 24 },
        { myId: 3, name: "Rimoni", age: 24 },
        { myId: 4, name: "Shimoli", age: 24 },
        { myId: 5, name: "Urja", age: 24 },
        { myId: 6, name: "Aaryaman", age: 24 },
      ]}
      dataIdColumn="myId"
      rowValidator={rowValidator}
      newRowObj={{ myId: null, name: "", age: "" }}
      dataTransformer={(data) => {
        let total = 0;
        let result = data.map((one) => {
          total = total + Number(one.age) ?? 0;
          return { ...one, cummulativeAge: total };
        });
        return result;
      }}
    />
  );
};

export default App;

const rowValidator = async (obj) => {
  const rowScheam = yup.object({
    name: yup
      .string()
      .typeError("this field is required")
      .required("this field is required"),
    age: yup
      .string()
      .typeError("this field is required")
      .required("this field is required"),
  });
  try {
    await rowScheam.validate(obj, {
      strict: false,
      abortEarly: false,
    });
    return {};
  } catch (e) {
    if (e instanceof yup.ValidationError) {
      let errorObj = {};
      for (let i = 0; i < e.inner.length; i++) {
        errorObj = setIn(
          errorObj,
          e.inner[i].path ?? "NOT_FOUND",
          e.inner[i].errors[0]
        );
      }
      throw errorObj;
    } else {
      console.log(e);
    }
  }
};
