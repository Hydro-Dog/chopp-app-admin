export const formatPhoneNumber = (value = '') => {  
  // Удаляем все нецифровые символы
  let numbers = value.replace(/\D/g, "");

  // Обрезаем, чтобы предотвратить ввод лишних символов
  numbers = numbers.substring(0, 11);

  // Разделяем строку на нужные части и добавляем дефисы
  const parts = [];
  if (numbers.length > 0) parts.push(numbers.substring(0, 1));
  if (numbers.length > 1) parts.push(numbers.substring(1, 4));
  if (numbers.length > 4) parts.push(numbers.substring(4, 7));
  if (numbers.length > 7) parts.push(numbers.substring(7, 9));
  if (numbers.length > 9) parts.push(numbers.substring(9, 11));

  // Собираем части в одну строку
  return parts.join("-");
};
