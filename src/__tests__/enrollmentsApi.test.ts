import { describe, expect, it, vi } from "vitest";
import handler, { parseEnrollment } from "../../api/enrollments";

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

const validEnrollment = {
  program: "AI + IT Training",
  email: "learner@example.com",
  name: "Jane Doe",
  phone: "+1 416 555 0123",
  city: "Toronto",
  country: "Canada",
  goal: "I want to build practical IT skills for a new career.",
};

describe("parseEnrollment", () => {
  it("accepts a complete enrollment request", () => {
    expect(parseEnrollment(validEnrollment)).toEqual({
      ok: true,
      enrollment: validEnrollment,
    });
  });

  it("rejects an unknown program", () => {
    expect(parseEnrollment({ ...validEnrollment, program: "Secret Course" })).toEqual({
      ok: false,
      error: "Please choose a valid Stellar program.",
    });
  });
});

describe("enrollments API", () => {
  it("rejects non-POST requests", async () => {
    const response = mockResponse();
    await handler({ method: "GET" }, response);
    expect(response.statusCode).toBe(405);
  });

  it("accepts a valid enrollment without sending email", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const response = mockResponse();

    await handler({ method: "POST", body: validEnrollment }, response);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({ ok: true, id: expect.any(String) }),
    );
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
