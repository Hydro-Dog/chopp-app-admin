export const sortByOrder = <T extends { order: number }>(arr: T[]) =>
  arr?.sort((a, b) => a.order - b.order);
