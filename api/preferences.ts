type PreferenceRequest = {
  email?: string;
  action?: string;
  topics?: string[];
};

type VercelRequest = {
  method?: string;
  body?: PreferenceRequest | string;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedTopics = [
  "training",
  "career",
  "newsletter",
  "notices",
] as const;

function getBody(request: VercelRequest): PreferenceRequest {
  if (typeof request.body === "string") {
    return JSON.parse(request.body) as PreferenceRequest;
  }

  return request.body ?? {};
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed." });
  }

  let payload: PreferenceRequest;
  try {
    payload = getBody(request);
  } catch {
    return response.status(400).json({ error: "Invalid preference data." });
  }

  const email = payload.email?.trim() ?? "";
  const action = payload.action?.trim() ?? "";
  const topics = Array.isArray(payload.topics)
    ? payload.topics.filter((topic) =>
        allowedTopics.includes(topic as (typeof allowedTopics)[number]),
      )
    : [];

  if (!emailPattern.test(email)) {
    return response.status(400).json({ error: "Please enter a valid email address." });
  }

  if (action !== "update" && action !== "unsubscribe") {
    return response.status(400).json({ error: "Please choose a valid preference action." });
  }

  const record = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    email,
    action,
    topics: action === "unsubscribe" ? [] : topics,
  };

  console.info("preferences.received", record.id, record.action, record.email);

  return response.status(200).json({ ok: true, id: record.id });
}
