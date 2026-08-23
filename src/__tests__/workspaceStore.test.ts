import {
  createStudentAccount,
  demoStaff,
  inboxForEmail,
  recordInboxItem,
  signInAccount,
} from "../utils/workspaceStore";

describe("workspace store", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("creates a student account and signs that person back in", () => {
    const created = createStudentAccount("Jane Doe", "jane@example.com", "Secure123");
    expect(created.ok).toBe(true);

    const signedIn = signInAccount("jane@example.com", "Secure123");
    expect(signedIn.ok).toBe(true);
    if (signedIn.ok) {
      expect(signedIn.session.role).toBe("student");
    }
  });

  it("signs in the seeded staff account", () => {
    const signedIn = signInAccount(demoStaff.email, demoStaff.password);
    expect(signedIn.ok).toBe(true);
    if (signedIn.ok) {
      expect(signedIn.session.role).toBe("staff");
    }
  });

  it("stores inbox items against an email", () => {
    recordInboxItem({
      type: "payment",
      title: "Regular IT Training",
      email: "jane@example.com",
      name: "Jane Doe",
      detail: "Paid $1,500 · card ending 4242",
    });

    expect(inboxForEmail("jane@example.com")).toHaveLength(1);
  });
});
