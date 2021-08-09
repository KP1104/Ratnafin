import * as yup from "yup";
import { setIn } from "packages/form";

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

export const dataTransform = (data) => {
  let total = 0;
  let result = data.map((one) => {
    if (one.age !== "" && !isNaN(Number(one.age))) {
      total = total + Number(one.age) ?? 0;
      return { ...one, cummulativeAge: total };
    } else {
      return { ...one, cummulativeAge: 0 };
    }
  });
  return result;
};

const GeneralDetailsMetaData = {
  form: {
    name: "123456",
    label: "Target Details",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "home",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: {
        "0": "Business By Direct Team",
        "1": "Lead Target",
        "2": "Cross",
      },
      gridConfig: {
        item: {
          xs: 12,
          sm: 3,
          md: 3,
        },
        container: {
          direction: "row",
          spacing: 2,
        },
      },
    },
    componentProps: {
      textField: {
        fullWidth: true,
      },
      select: {
        fullWidth: true,
      },
      datePicker: {
        fullWidth: true,
      },
      numberFormat: {
        fullWidth: true,
      },
      inputMask: {
        fullWidth: true,
      },
      searchField: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "dataTable",
        group: 0,
      },
      name: "table",
      label: "demo",
      rowValidator: rowValidator,
      dataTransformer: dataTransform,
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      arrayFieldIDName: "myID",
      _columns: [
        {
          accessor: "name",
          alignment: "left",
          width: 200,
          Cell: "textField",
          columnName: "Name",
          footer: false,
          defaultValue: "",
          options: "getTaskType",
        },
        {
          accessor: "age",
          alignment: "right",
          width: 100,
          Cell: "textField",
          columnName: "Age",
          footer: true,
          defaultValue: 18,
        },
        {
          accessor: "cummulativeAge",
          alignment: "right",
          width: 130,
          columnName: "Cummulative Age",
          footer: true,
          defaultValue: 0,
        },
      ],
    },
  ],
};
export default GeneralDetailsMetaData;
