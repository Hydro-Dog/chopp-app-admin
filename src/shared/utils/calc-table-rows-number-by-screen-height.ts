export const calcTableRowsNumberByScreenHeight = (
  availableHeight: number,
  rowHeight = 40,
  tablePaddings = 80,
) => {
  const rowsHeight = availableHeight - tablePaddings;
  return Math.floor(rowsHeight / rowHeight);
};
