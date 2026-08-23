const usersKey = "stellar-users";
const sessionKey = "stellar-session";
const inboxKey = "stellar-inbox";

export const demoStudent = {
  name: "Alex Learner",
  email: "learner@stellargroupware.com",
  password: "LearnStellar1",
} as const;

export const demoStaff = {
  name: "Sam Advisor",
  email: "staff@stellargroupware.com",
  password: "StaffStellar1",
} as const;

export type AccountRole = "student" | "staff";

export type AccountRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: AccountRole;
  createdAt: string;
};

export type SessionRecord = {
  email: string;
  name: string;
  role: AccountRole;
};

export type InboxItem = {
  id: string;
  type: "appointment" | "enrollment" | "payment" | "account" | "preference";
  createdAt: string;
  title: string;
  email: string;
  name?: string;
  detail: string;
};

function hashSecret(value: string) {
  let hash = 2166136261;
  const input = value.trim().toLowerCase();
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function createAccountRecord(
  name: string,
  email: string,
  password: string,
  role: AccountRole,
): AccountRecord {
  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash: hashSecret(`${email}:${password}`),
    role,
    createdAt: new Date().toISOString(),
  };
}

function seedDemoAccounts(users: AccountRecord[]) {
  const next = [...users];
  const hasStudent = next.some((user) => user.email === demoStudent.email);
  const hasStaff = next.some((user) => user.email === demoStaff.email);

  if (!hasStudent) {
    next.push(
      createAccountRecord(
        demoStudent.name,
        demoStudent.email,
        demoStudent.password,
        "student",
      ),
    );
  }

  if (!hasStaff) {
    next.push(
      createAccountRecord(demoStaff.name, demoStaff.email, demoStaff.password, "staff"),
    );
  }

  if (next.length !== users.length) {
    writeJson(usersKey, next);
  }

  return next;
}

function readUsers() {
  return seedDemoAccounts(readJson<AccountRecord[]>(usersKey, []));
}

export function isValidPassword(value: string) {
  return /^(?=.*[A-Za-z])(?=.*\d).{8,80}$/.test(value);
}

export function readSession(): SessionRecord | null {
  readUsers();
  return readJson<SessionRecord | null>(sessionKey, null);
}

export function clearSession() {
  window.localStorage.removeItem(sessionKey);
}

export function createStudentAccount(name: string, email: string, password: string) {
  if (!isValidPassword(password)) {
    return { ok: false as const, error: "Use 8+ characters with a letter and a number." };
  }

  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();
  if (users.some((user) => user.email === normalizedEmail)) {
    return { ok: false as const, error: "An account with this email already exists. Sign in instead." };
  }

  const account = createAccountRecord(name, normalizedEmail, password, "student");
  writeJson(usersKey, [...users, account]);
  const session = { email: account.email, name: account.name, role: account.role };
  writeJson(sessionKey, session);
  return { ok: true as const, session };
}

export function signInAccount(email: string, password: string) {
  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const account = users.find((user) => user.email === normalizedEmail);
  if (!account || account.passwordHash !== hashSecret(`${normalizedEmail}:${password}`)) {
    return { ok: false as const, error: "Email or password is incorrect." };
  }

  const session = { email: account.email, name: account.name, role: account.role };
  writeJson(sessionKey, session);
  return { ok: true as const, session };
}

export function readInbox(): InboxItem[] {
  return readJson<InboxItem[]>(inboxKey, []).sort((left, right) =>
    right.createdAt.localeCompare(left.createdAt),
  );
}

export function recordInboxItem(
  item: Omit<InboxItem, "id" | "createdAt"> & { id?: string; createdAt?: string },
) {
  const record: InboxItem = {
    id: item.id ?? crypto.randomUUID(),
    createdAt: item.createdAt ?? new Date().toISOString(),
    type: item.type,
    title: item.title,
    email: item.email.trim().toLowerCase(),
    name: item.name?.trim(),
    detail: item.detail,
  };
  writeJson(inboxKey, [record, ...readInbox().filter((entry) => entry.id !== record.id)]);
  return record;
}

export function inboxForEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return readInbox().filter((item) => item.email === normalized);
}
