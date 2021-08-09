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
  setFormError,
}) => {
  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);
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
        setIsError(false);
        currentRowError.current = {};
      } catch (e) {
        setError(e);
        setIsError(true);
        currentRowError.current = e;
      }
    };
    executeValidation(currentRow);
  }, [currentRow]);

  useEffect(() => {
    isError ? setFormError("has error") : setFormError("");
  }, [isError]);

  useEffect(() => {
    return () => {
      setFormError("");
    };
  }, []);

  return (
    <RowContext.Provider value={{ error, currentRow, setCellValue }}>
      {children}
    </RowContext.Provider>
  );
};
