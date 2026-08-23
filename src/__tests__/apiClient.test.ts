import { errorMessage, postJson } from "../utils/apiClient";

describe("api client", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("posts JSON and returns the parsed body", async () => {
    const fetchSpy = jest.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true, id: "req-1" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await expect(
      postJson("/api/enrollments", { email: "jane@example.com" }, "Unable to send."),
    ).resolves.toEqual({ ok: true, id: "req-1" });

    expect(fetchSpy).toHaveBeenCalledWith(
      "/api/enrollments",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    );
  });

  it("uses the server error when a request fails", async () => {
    jest.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "Please choose a valid Stellar program." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await expect(
      postJson("/api/enrollments", { program: "Secret" }, "Unable to send."),
    ).rejects.toThrow("Please choose a valid Stellar program.");
  });

  it("falls back to a readable message for unknown errors", () => {
    expect(errorMessage("nope", "Please try again.")).toBe("Please try again.");
    expect(errorMessage(new Error("Network down"), "Please try again.")).toBe(
      "Network down",
    );
  });
});
