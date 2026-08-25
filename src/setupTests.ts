import "@testing-library/jest-dom";

if (typeof globalThis.Response === "undefined") {
  class TestResponse {
    private readonly bodyText: string;
    readonly status: number;
    readonly ok: boolean;

    constructor(bodyText: string, init?: { status?: number; headers?: Record<string, string> }) {
      this.bodyText = bodyText;
      this.status = init?.status ?? 200;
      this.ok = this.status >= 200 && this.status < 300;
    }

    json() {
      return Promise.resolve(JSON.parse(this.bodyText));
    }
  }

  Object.defineProperty(globalThis, "Response", {
    configurable: true,
    writable: true,
    value: TestResponse,
  });
}

if (typeof globalThis.fetch !== "function") {
  Object.defineProperty(globalThis, "fetch", {
    configurable: true,
    writable: true,
    value: jest.fn(),
  });
}
