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
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Alert } from "components/common/alert";
import { setIn } from "packages/form";
import metaData from "./metaData";
import { useCheckboxColumn } from "./components/useCheckbox";
import { useSnackbar } from "notistack";

const MYTable: FC<{
  columns: any;
  data: any;
  newRowObj?: any;
  dataIdColumn: any;
  rowValidator?: any;
}> = ({ columns, data = [], newRowObj, dataIdColumn, rowValidator }) => {
  const rowIDColumn = "__id";
  const incrCounter = useRef(-1);
  const myColumns = useMemo(() => columns, []);
  const [myData, setMyData] = useState(() =>
    data.map((one) => ({ ...one, [rowIDColumn]: ++incrCounter.current }))
  );
  const currentRowObj = useRef({});
  const [currentEditRow, setCurrentEditRow] = useState(-1);
  const [newRowAdded, setNewRowAdded] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const getRowId = useCallback((data) => data[rowIDColumn], []);

  const closeDialog = useCallback(() => {
    setShowDialog(false);
  }, [setShowDialog]);

  const handleCurrentRowCellChange = useCallback((value) => {
    currentRowObj.current = { ...currentRowObj.current, ...value };
  }, []);

  const addNewRow = useCallback(() => {
    if (!newRowAdded) {
      setMyData((old) => [
        ...old,
        {
          ...newRowObj,
          [rowIDColumn]: ++incrCounter.current,
        },
      ]);
      setNewRowAdded(true);
      setCurrentEditRow(incrCounter.current);
      currentRowObj.current = {};
    }
  }, [setMyData, setNewRowAdded, setCurrentEditRow, newRowAdded, myData]);

  const saveCurrentRow = useCallback(
    (index) => {
      let newData = myData.map((one) => {
        if (getRowId(one) === index) {
          return { ...one, ...currentRowObj.current };
        }
        return one;
      });
      setMyData(newData);
      setCurrentEditRow(-1);
      setNewRowAdded(false);
      currentRowObj.current = {};
    },
    [setMyData, setNewRowAdded, setCurrentEditRow, myData, getRowId]
  );

  const cancelCurrentRowEdit = useCallback(
    (index) => {
      if (newRowAdded) {
        setMyData((old) => old.filter((one) => !(getRowId(one) === index)));
      }
      setCurrentEditRow(-1);
      setNewRowAdded(false);
      currentRowObj.current = {};
    },
    [setMyData, setCurrentEditRow, setNewRowAdded, newRowAdded]
  );

  const requestRowEdit = useCallback(
    (index) => {
      if (newRowAdded) {
        return;
      }
      if (currentEditRow === -1) {
        setCurrentEditRow(index);
      } else {
        saveCurrentRow(currentEditRow);
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
      currentRowError,
      getRowId,
      handleCurrentRowCellChange,
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
    rows,
    prepareRow,
    totalColumnsWidth,
    selectedFlatRows,
  } = tableProps;

  return (
    <Fragment>
      <Paper style={{ width: `${totalColumnsWidth}px`, overflow: "scroll" }}>
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
                    <TableCell {...column.getHeaderProps()} component="div">
                      {column.render("Header")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps({})} component="div">
              <div style={{ overflow: "auto", maxHeight: "500px" }}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <TableRow {...row.getRowProps()} component="div">
                      {row.cells.map((cell) => (
                        <TableCell
                          {...cell.getCellProps([
                            {
                              style: {
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                              },
                            },
                          ])}
                          component="div"
                        >
                          {cell.render("Cell")}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
                <TableRow component="div">
                  <Button onClick={addNewRow}>AddRow</Button>
                </TableRow>
              </div>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
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
    return null;
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
      return errorObj;
    }
    return e.message;
  }
};
