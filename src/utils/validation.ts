export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const namePattern = /^[A-Za-zÀ-ÿ' -]{2,80}$/;
export const phonePattern = /^[0-9+() -]{10,20}$/;
export const cityPattern = /^[A-Za-zÀ-ÿ' .-]{2,80}$/;

export function isValidEmail(value: string) {
  return emailPattern.test(value.trim());
}

export function isValidName(value: string) {
  return namePattern.test(value.trim());
}

export function isValidPhone(value: string) {
  return phonePattern.test(value.trim());
}

export function isValidCity(value: string) {
  return cityPattern.test(value.trim());
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
