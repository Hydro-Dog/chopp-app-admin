// ПРИМЕР:
// const allowed = {
//   id: true,
//   name: true,
//   orderStatus: true,
//   items: {
//     '*': {
//       quantity: true,
//       product: {
//         title: true,
//         category: {
//           title: true,
//         },
//       },
//     },
//   },
// };

type AllowedKeys = {
  [key: string]: true | AllowedKeys;
};

export function filterObjectByKeys({
  input,
  allowed,
}: {
  input: any;
  allowed: AllowedKeys;
}): any {
  if (typeof input !== 'object' || input === null) return input;

  const result: any = Array.isArray(input) ? [] : {};

  for (const key in allowed) {
    const rule = allowed[key];

    if (Array.isArray(input)) {
      if (key === '*' && typeof rule === 'object') {
        return input
          .map((item) => filterObjectByKeys({ input: item, allowed: rule }))
          .filter((item) => item !== null && item !== undefined && Object.keys(item).length > 0); // ⬅️ важно
      }
    }

    if (input.hasOwnProperty(key)) {
      const value = input[key];

      if (rule === true) {
        result[key] = value;
      } else if (typeof rule === 'object') {
        if (Array.isArray(value)) {
          const filtered = value
            .map((item) =>
              filterObjectByKeys({ input: item, allowed: rule['*'] as AllowedKeys })
            )
            .filter((item) => item !== null && item !== undefined && Object.keys(item).length > 0); // ⬅️

          if (filtered.length > 0) {
            result[key] = filtered;
          }
        } else {
          const nested = filterObjectByKeys({ input: value, allowed: rule });
          if (nested !== null && nested !== undefined && Object.keys(nested).length > 0) {
            result[key] = nested;
          }
        }
      }
    }
  }

  return result;
}
