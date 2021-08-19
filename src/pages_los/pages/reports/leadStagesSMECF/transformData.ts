export const transformData = (data: any = []) => {
  let result = data.map((one) => ({
    ...one,
    TotalCount: one.SMECount + one.CFCount,
    TotalValue: one.SMEValue + one.CFValue,
    TotalFees: one.SMEFees + one.CFFees,
  }));
  return result;
};
