export const generateExcelColumns = (count: number): string[] => {
  const result: string[] = [];

  for (let i = 1; i <= count; i++) {
    let num = i;
    let column = "";

    while (num > 0) {
      const remainder = (num - 1) % 26;
      column = String.fromCharCode(65 + remainder) + column;
      num = Math.floor((num - 1) / 26);
    }

    result.push(column);
  }

  return result;
};
