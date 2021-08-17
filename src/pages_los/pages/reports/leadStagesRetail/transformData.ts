export const data: any = [
  {
    serialNo: "L1",
    particulars: "Lead Info HOT",
    SME: [
      {
        name: "0-7",
        count: 6,
        value: 39200,
        fees: 0,
      },
      {
        name: "8-14",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "15-21",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "21+",
        count: 0,
        value: 0,
        fees: 0,
      },
    ],
    CF: [
      {
        name: "0-7",
        count: 1,
        value: 500000,
        fees: 0,
      },
      {
        name: "8-14",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "15-21",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "21+",
        count: 0,
        value: 0,
        fees: 0,
      },
    ],
  },
  {
    serialNo: "L2",
    particulars: "Lead Login",
    SME: [
      {
        name: "0-7",
        count: 6,
        value: 495000,
        fees: 0,
      },
      {
        name: "8-14",
        count: 1,
        value: 65650,
        fees: 0,
      },
      {
        name: "15-21",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "21+",
        count: 28,
        value: 600578551,
        fees: 0,
      },
    ],
    CF: [
      {
        name: "0-7",
        count: 1,
        value: 170000,
        fees: 0,
      },
      {
        name: "8-14",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "15-21",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "21+",
        count: 7,
        value: 44223943,
        fees: 0,
      },
    ],
  },
  {
    serialNo: "L3",
    particulars: "Mandate Sent",
    SME: [
      {
        name: "0-7",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "8-14",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "15-21",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "21+",
        count: 0,
        value: 0,
        fees: 0,
      },
    ],
    CF: [
      {
        name: "0-7",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "8-14",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "15-21",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "21+",
        count: 0,
        value: 0,
        fees: 0,
      },
    ],
  },
  {
    serialNo: "L4",
    particulars: "Mandate Received",
    SME: [
      {
        name: "0-30",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "31-45",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "45+",
        count: 0,
        value: 0,
        fees: 0,
      },
    ],
    CF: [
      {
        name: "0-30",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "31-45",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "45+",
        count: 0,
        value: 0,
        fees: 0,
      },
    ],
  },
  {
    serialNo: "L5",
    particulars: "Bank Login",
    SME: [
      {
        name: "0-15",
        count: 1,
        value: 1000,
        fees: 0,
      },
      {
        name: "16-30",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "30+",
        count: 0,
        value: 0,
        fees: 0,
      },
    ],
    CF: [
      {
        name: "0-15",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "16-30",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "30+",
        count: 0,
        value: 0,
        fees: 0,
      },
    ],
  },
  {
    serialNo: "L6",
    particulars: "Sanction",
    SME: [
      {
        name: "0-15",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "16-30",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "30+",
        count: 0,
        value: 0,
        fees: 0,
      },
    ],
    CF: [
      {
        name: "0-15",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "16-30",
        count: 0,
        value: 0,
        fees: 0,
      },
      {
        name: "30+",
        count: 0,
        value: 0,
        fees: 0,
      },
    ],
  },
  {
    serialNo: "L7",
    particulars: "Disburse",
    SME: [
      {
        name: "0+",
        count: 0,
        value: 0,
        fees: 0,
      },
    ],
    CF: [
      {
        name: "0+",
        count: 0,
        value: 0,
        fees: 0,
      },
    ],
  },
];

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
