const lengthValidation = (length: number, value: string) => {
  return value.length >= length;
};

const emailValidation = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

const searchValidation = (search: string) => {
  const searchRegex = /^[A-Z0-9._%+-@]/i;
  return searchRegex.test(search);
};

const dateValidation = (value: string) => {
  //Cremos un objeto que represente el día actual
  const today = new Date(Date.now());
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  //Comprobamos que es una fecha valida y que es anterior al día de hoy
  const parts = value.split('-');
  try {
    const day = Number(parts[2]);
    const month = Number(parts[1]);
    const year = Number(parts[0]);
    return day > 0 && day <= 31 && month > 1 && month <= 12 && year > 0 && new Date(value) < today;
  } catch (error) {
    return false;
  }
};

const telephoneValidation = (value: string) => {
  // Eliminar cualquier espacio en blanco o guiones del número de teléfono
  const cleanedPhoneNumber = value.replace(/\s|-/g, '');

  // Validar que el número de teléfono tenga entre 7 y 15 dígitos y no contenga caracteres no numéricos
  const phoneRegex = /^\d{9}$/;
  return phoneRegex.test(cleanedPhoneNumber);
};

const numberLessThanValidation = (value: number, limit: number) => {
  return value < limit;
};

const numberMoreThanValidation = (value: number, limit: number) => {
  return value > limit;
}




export { lengthValidation, emailValidation, searchValidation, dateValidation, telephoneValidation, numberLessThanValidation, numberMoreThanValidation }
