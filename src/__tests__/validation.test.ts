import {
  isValidCity,
  isValidEmail,
  isValidName,
  isValidPhone,
} from "../utils/validation";

describe("shared form validation", () => {
  it("accepts a normal email and rejects a missing domain", () => {
    expect(isValidEmail("sammy@stellargroupware.com")).toBe(true);
    expect(isValidEmail("sammy@stellar")).toBe(false);
  });

  it("accepts a two-letter name and rejects digits", () => {
    expect(isValidName("Jo")).toBe(true);
    expect(isValidName("Jo3")).toBe(false);
  });

  it("accepts a formatted phone number and rejects a short one", () => {
    expect(isValidPhone("(416) 555-0199")).toBe(true);
    expect(isValidPhone("555")).toBe(false);
  });

  it("accepts a city name and rejects an empty value", () => {
    expect(isValidCity("St. John's")).toBe(true);
    expect(isValidCity(" ")).toBe(false);
  });
});
