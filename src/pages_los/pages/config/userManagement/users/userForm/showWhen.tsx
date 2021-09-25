export const ShowWhen = ({ children, condition, otherwise = null }) => {
  if (condition) {
    return children;
  } else {
    return otherwise;
  }
};
