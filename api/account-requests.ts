type AccountRequest = {
  name?: string;
  email?: string;
  note?: string;
};

type VercelRequest = {
  method?: string;
  body?: AccountRequest | string;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[A-Za-zÀ-ÿ' -]{2,80}$/;

function getBody(request: VercelRequest): AccountRequest {
  if (typeof request.body === "string") {
    return JSON.parse(request.body) as AccountRequest;
  }

  return request.body ?? {};
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed." });
  }

  let payload: AccountRequest;
  try {
    payload = getBody(request);
  } catch {
    return response.status(400).json({ error: "Invalid account request." });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const note = payload.note?.trim() ?? "";

  if (!namePattern.test(name)) {
    return response.status(400).json({ error: "Please enter your full name." });
  }

  if (!emailPattern.test(email)) {
    return response.status(400).json({ error: "Please enter a valid email address." });
  }

  if (note.length < 10 || note.length > 1000) {
    return response.status(400).json({ error: "Please tell us how we can help, using at least 10 characters." });
  }

  const record = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    name,
    email,
    note,
  };

  console.info("account-request.received", record.id, record.email);

  return response.status(200).json({ ok: true, id: record.id });
}
