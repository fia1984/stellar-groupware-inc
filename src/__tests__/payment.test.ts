import {
  cardLastFour,
  formatCardNumber,
  isValidCardCvc,
  isValidCardExpiry,
  isValidCardNumber,
  testCardNumber,
} from "../utils/payment";

describe("payment helpers", () => {
  it("accepts the demo Visa test card and rejects a short number", () => {
    expect(isValidCardNumber(testCardNumber)).toBe(true);
    expect(isValidCardNumber("4242")).toBe(false);
    expect(cardLastFour(formatCardNumber(testCardNumber))).toBe("4242");
  });

  it("accepts a future expiry and a 3-digit CVC", () => {
    expect(isValidCardExpiry("12/30")).toBe(true);
    expect(isValidCardExpiry("13/30")).toBe(false);
    expect(isValidCardCvc("123")).toBe(true);
    expect(isValidCardCvc("12")).toBe(false);
  });
});
