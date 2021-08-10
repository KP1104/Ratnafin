import {
  createContext,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useEffect,
  useState,
  useCallback,
} from "react";

export const RowContext = createContext<any>({});

export const RowContextProvider = forwardRef<any, any>(
  (
    {
      currentRowError,
      currentRowObj,
      children,
      initialData,
      rowValidator,
      setFormError,
    },
    ref
  ) => {
    const initialTouched = useMemo(() => {
      let touchedObj = {};
      for (const one in initialData) {
        touchedObj[one] = false;
      }
      return touchedObj;
    }, []);
    const [error, setError] = useState({});
    const [isError, setIsError] = useState(false);
    const [currentRow, setCurrentRow] = useState(initialData);
    const [touched, setTouched] = useState(initialTouched);

    const touchAll = useCallback(() => {
      let touchAll = {};
      for (const one in initialTouched) {
        touchAll[one] = true;
      }
      setTouched(touchAll);
    }, [initialTouched]);

    useImperativeHandle(ref, () => ({
      touchAll: touchAll,
    }));

    const setCellValue = useCallback((value) => {
      setCurrentRow((old) => {
        let result = { ...old, ...value };
        currentRowObj.current = result;
        return result;
      });
    }, []);

    const setCellTouched = useCallback((value) => {
      setTouched((old) => {
        let result = { ...old, ...value };
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
      <RowContext.Provider
        value={{ error, currentRow, setCellValue, touched, setCellTouched }}
      >
        {children}
      </RowContext.Provider>
    );
  }
);
