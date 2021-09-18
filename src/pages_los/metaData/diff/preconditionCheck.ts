export const checkForPrecondition = (newFields, viewFields, editFields) => {
  if (
    !(
      Array.isArray(newFields) ||
      Array.isArray(viewFields) ||
      Array.isArray(editFields)
    )
  ) {
    return false;
  }
  if (
    newFields.length === viewFields.length &&
    viewFields.length === editFields.length
  ) {
    let trueCount = 0;
    for (let i = 0; i < newFields.length; i++) {
      if (
        newFields[i].name === viewFields[i].name &&
        viewFields[i].name === editFields[i].name
      ) {
        if (
          newFields[i]?.render?.componentType === "arrayField" &&
          viewFields[i]?.render?.componentType === "arrayField" &&
          editFields[i]?.render?.componentType === "arrayField"
        ) {
          let result = checkForPrecondition(
            newFields[i]._fields,
            viewFields[i]._fields,
            editFields[i]._fields
          );
          if (result === false) {
            return false;
          }
        }
        trueCount++;
      } else {
        console.log(newFields[i].name, viewFields[i].name, editFields[i].name);
      }
    }
    if (trueCount === newFields.length) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
