export const testCardNumber = "4242424242424242";

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function formatCardNumber(value: string) {
  return digitsOnly(value).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function formatCardExpiry(value: string) {
  const digits = digitsOnly(value).slice(0, 4);
  if (digits.length < 3) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function isValidCardNumber(value: string) {
  const digits = digitsOnly(value);
  if (digits.length !== 16) {
    return false;
  }

  let sum = 0;
  for (let index = 0; index < digits.length; index += 1) {
    let digit = Number(digits[digits.length - 1 - index]);
    if (index % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  return sum % 10 === 0;
}

export function isValidCardExpiry(value: string) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value.trim());
  if (!match) {
    return false;
  }

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) {
    return false;
  }

  const now = new Date();
  const expiry = new Date(year, month, 0, 23, 59, 59);
  return expiry >= now;
}

export function isValidCardCvc(value: string) {
  return /^\d{3,4}$/.test(value.trim());
}

export function cardLastFour(value: string) {
  return digitsOnly(value).slice(-4);
}
