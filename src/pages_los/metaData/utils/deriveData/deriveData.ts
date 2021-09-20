import { merge } from "lodash-es";

export const extractMetaData = (metaData, mode) => {
  let newFields = deriveData(metaData.fields, mode);
  return { form: metaData.form, fields: newFields };
};

export const deriveData = (fields, mode) => {
  if (!Array.isArray(fields)) {
    return fields;
  }
  return fields.map((one) => {
    const { __VIEW__, __EDIT__, __NEW__, ...fieldObj } = one;
    try {
      if (fieldObj.render.componentType === "arrayField") {
        let newField = deriveData(fieldObj._fields, mode);
        fieldObj._fields = newField;
      }
    } catch (e) {
      console.log(one);
    }
    let newFieldObj;
    if (mode === "new") {
      newFieldObj = merge({}, fieldObj, __NEW__);
    } else if (mode === "edit") {
      newFieldObj = merge({}, fieldObj, __EDIT__);
    } else if (mode === "view") {
      newFieldObj = merge({}, fieldObj, __VIEW__);
    }
    return newFieldObj;
  });
};
