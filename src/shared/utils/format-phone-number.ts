export const formatPhoneNumber = (value = '') => {
  // Удаляем все нецифровые символы
  let numbers = value.replace(/\D/g, '');

  // Обрезаем, чтобы предотвратить ввод лишних символов
  numbers = numbers.substring(0, 11);

  // Разделяем строку на нужные части и добавляем дефисы
  let formattedNumber = '';

  if (numbers.length > 0) formattedNumber += `+7 `;
  if (numbers.length > 1) formattedNumber += `(${numbers.substring(1, 4)}) `;
  if (numbers.length > 4) formattedNumber += `${numbers.substring(4, 7)}-`;
  if (numbers.length > 7) formattedNumber += `${numbers.substring(7, 9)}-`;
  if (numbers.length > 9) formattedNumber += numbers.substring(9, 11);

  return formattedNumber;
};
