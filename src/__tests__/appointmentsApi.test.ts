import { describe, expect, it, vi } from "vitest";
import handler from "../../api/appointments";

function mockResponse() {
  const result = {
    statusCode: 200,
    body: null as unknown,
    status(code: number) {
      result.statusCode = code;
      return result;
    },
    json(body: unknown) {
      result.body = body;
    },
  };

  return result;
}

const validAppointment = {
  date: "THU, AUG 20",
  time: "9:00 AM",
  name: "Jane Doe",
  phone: "+1 416 555 0123",
  email: "jane@example.com",
  city: "Toronto",
  country: "Canada",
  service: "Regular IT Training",
  requirement: "I need help choosing an IT training pathway.",
};

describe("appointments API", () => {
  it("rejects non-POST requests", async () => {
    const response = mockResponse();
    await handler({ method: "GET" }, response);
    expect(response.statusCode).toBe(405);
  });

  it("rejects incomplete appointment data", async () => {
    const response = mockResponse();
    await handler({ method: "POST", body: { name: "Jane Doe" } }, response);
    expect(response.statusCode).toBe(400);
  });

  it("accepts a valid appointment without sending email", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const response = mockResponse();

    await handler({ method: "POST", body: validAppointment }, response);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({ ok: true, id: expect.any(String) }),
    );
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
