import fileTypeDetect, { FileTypeResult } from "file-type/browser";

export const detectMimeType = async (
  fileBlob
): Promise<FileTypeResult | undefined> => {
  const mime = await fileTypeDetect.fromBlob(fileBlob);
  return mime;
};

export const isMimeTypeValid = (ext, whiteListExtension: string[] | string) =>
  whiteListExtension === "all" ||
  (Array.isArray(whiteListExtension) && whiteListExtension.indexOf(ext) > -1);

export const validateFilesAndAddToList = (
  maxAllowedSize: number,
  allowedExtensions: string | string[]
) => async (file) => {
  const mimeType: any = await detectMimeType(file);
  if (file.size > maxAllowedSize) {
    return "File Size exceed maximum size";
  }
  if (!isMimeTypeValid(mimeType.ext, allowedExtensions)) {
    return `${mimeType?.ext} file type not supported`;
  }
  return null;
};
