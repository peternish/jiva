export const getStringOrFirstArrayValue = (el) => {
  let res;
  if (Array.isArray(el)) res = el.length != 0 ? el[0] : null;
  else if (typeof el === "string") res = el;
  return res;
};

export const capitalize = (str) => {
  if (typeof str === "string" && str.length != 0) {
    return str[0].toLocaleUpperCase() + str.slice(1);
  }
  return str;
};
