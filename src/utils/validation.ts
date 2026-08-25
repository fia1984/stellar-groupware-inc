export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const namePattern = /^[A-Za-zÀ-ÿ' -]{2,80}$/;
export const cityPattern = /^[A-Za-zÀ-ÿ' .-]{2,80}$/;

export function isValidEmail(value: string) {
  return emailPattern.test(value.trim());
}

export function isValidName(value: string) {
  return namePattern.test(value.trim());
}

export function phoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function isValidPhone(value: string) {
  const digits = phoneDigits(value);
  return digits.length >= 10 && digits.length <= 15;
}

export function isValidCity(value: string) {
  return cityPattern.test(value.trim());
}

export function getNameError(value: string) {
  if (!value.trim()) {
    return "Enter your full name.";
  }

  if (!isValidName(value)) {
    return "Enter your name using letters only.";
  }

  return "";
}

export function getPhoneError(value: string) {
  if (!value.trim()) {
    return "Enter your phone number.";
  }

  if (!isValidPhone(value)) {
    return "Enter a valid phone number with area code.";
  }

  return "";
}

export function getEmailError(value: string) {
  if (!value.trim()) {
    return "Enter your email address.";
  }

  if (!isValidEmail(value)) {
    return "Enter a valid email, like jane@example.com.";
  }

  return "";
}

export function getCityError(value: string) {
  if (!value.trim()) {
    return "Enter your city.";
  }

  if (!isValidCity(value)) {
    return "Enter a valid city name.";
  }

  return "";
}

export function focusFirstInvalidField(
  errors: Record<string, string>,
  fieldIds: Array<[string, string]>,
) {
  const first = fieldIds.find(([field]) => Boolean(errors[field]));
  if (!first) {
    return;
  }

  document.getElementById(first[1])?.focus();
}
