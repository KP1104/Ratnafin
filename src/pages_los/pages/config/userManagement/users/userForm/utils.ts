export const initCap = (s: string) => {
  return s.replace(/(?:^|\b)[a-z]/g, (m) => m.toUpperCase());
};
