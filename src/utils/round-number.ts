export const rountNumber = (num: number, count: number) => {
  const pow10 = Math.pow(10, count);

  return Math.round(num * pow10) / pow10;
};
