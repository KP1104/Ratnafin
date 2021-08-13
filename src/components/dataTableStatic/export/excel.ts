import { utils, write } from "xlsx";

export const createNewWorkbook = ({ title, data }) => {
  const excelData = utils.json_to_sheet(data);
  const wb = utils.book_new();
  wb.Props = {
    Title: title,
    Author: "LOS",
    CreatedDate: new Date(),
  };
  wb.SheetNames.push(title);
  wb.Sheets[title] = excelData;
  const wbout = write(wb, { bookType: "xlsx", type: "binary" });
  let octetStream = convertToOctetStream(wbout);
  let blob = new Blob([octetStream], { type: "application/octet-stream" });
  return blob;
};

const convertToOctetStream = (data: any) => {
  let buf = new ArrayBuffer(data.length);
  let view = new Uint8Array(buf);
  for (let i = 0; i < data.length; i++) view[i] = data.charAt(i) & 0xff;
  return buf;
};
