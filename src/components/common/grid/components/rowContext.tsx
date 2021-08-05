import { useEffect } from "react";
import { useState, useCallback } from "react";
import { createContext } from "react";

export const RowContext = createContext<any>({});

export const RowContextProvider = ({
  currentRowError,
  currentRowObj,
  children,
  initialData,
  rowValidator,
}) => {
  const [error, setError] = useState({});
  const [currentRow, setCurrentRow] = useState(initialData);

  const setCellValue = useCallback((value) => {
    setCurrentRow((old) => {
      let result = { ...old, ...value };
      currentRowObj.current = result;
      return result;
    });
  }, []);

  useEffect(() => {
    const executeValidation = async (obj) => {
      try {
        await rowValidator(obj);
        setError({});
        currentRowError.current = {};
      } catch (e) {
        setError(e);
        currentRowError.current = e;
      }
    };
    executeValidation(currentRow);
  }, [currentRow]);

  return (
    <RowContext.Provider value={{ error, currentRow, setCellValue }}>
      {children}
    </RowContext.Provider>
  );
};
