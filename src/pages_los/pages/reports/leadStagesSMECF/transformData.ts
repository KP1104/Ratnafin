export const transformData = (data: any = []) => {
  let rows: any = [];
  for (let i = 0; i < data.length ?? -1; i++) {
    let { serialNo, particulars, SME, CF } = data[i];
    let rowsSME: any = {};
    let rowsCF: any = {};
    let buckets: any = {};
    for (let j = 0; j < SME?.length ?? -1; j++) {
      rowsSME[SME[j].name] = {
        bucket: SME[j].name,
        SMECount: SME[j].count,
        SMEValue: SME[j].value,
        SMEFees: SME[j].fees,
      };
      buckets[SME[j].name] = true;
    }
    for (let k = 0; k < CF.length ?? -1; k++) {
      rowsCF[CF[k].name] = {
        bucket: CF[k].name,
        CFCount: CF[k].count,
        CFValue: CF[k].value,
        CFFees: CF[k].fees,
      };
      buckets[CF[k].name] = true;
    }

    for (const bucket in buckets) {
      rows.push({
        serialNo,
        particulars,
        ...rowsSME[bucket],
        ...rowsCF[bucket],
        TotalCount: rowsSME[bucket].SMECount + rowsCF[bucket].CFCount,
        TotalValue: rowsSME[bucket].SMEValue + rowsCF[bucket].CFValue,
        TotalFees: rowsSME[bucket].SMEFees + rowsCF[bucket].CFFees,
      });
    }
  }
  return rows;
};
