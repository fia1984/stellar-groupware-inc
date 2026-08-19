type EnrollmentRequest = {
  program?: string;
  email?: string;
  name?: string;
  phone?: string;
  city?: string;
  country?: string;
  goal?: string;
};

type VercelRequest = {
  method?: string;
  body?: EnrollmentRequest | string;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
};

export type ParsedEnrollment = {
  program: string;
  email: string;
  name: string;
  phone: string;
  city: string;
  country: string;
  goal: string;
};

export const enrollmentPrograms = [
  "Regular IT Training",
  "AI + IT Training",
  "Bootcamp Support",
  "Marketing Support",
  "Direct Bootcamp",
  "Career Marketing",
  "Direct Marketing Program",
  "AI & Automation Foundations",
  "Azure Cloud & DevOps",
  "Data Analytics with Power BI",
  "Full Stack Web Development",
  "Cybersecurity & IT Support",
  "QA & Test Automation",
] as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[A-Za-zÀ-ÿ' -]{2,80}$/;
const phonePattern = /^[0-9+() -]{10,20}$/;
const cityPattern = /^[A-Za-zÀ-ÿ' .-]{2,80}$/;
const countries = ["Canada", "United States", "United Kingdom", "India", "Other"];

function getBody(request: VercelRequest): EnrollmentRequest {
  if (typeof request.body === "string") {
    return JSON.parse(request.body) as EnrollmentRequest;
  }

  return request.body ?? {};
}

export function parseEnrollment(
  input: EnrollmentRequest,
): { ok: true; enrollment: ParsedEnrollment } | { ok: false; error: string } {
  const enrollment = {
    program: input.program?.trim() ?? "",
    email: input.email?.trim() ?? "",
    name: input.name?.trim() ?? "",
    phone: input.phone?.trim() ?? "",
    city: input.city?.trim() ?? "",
    country: input.country?.trim() ?? "",
    goal: input.goal?.trim() ?? "",
  };

  if (
    !enrollmentPrograms.includes(enrollment.program as (typeof enrollmentPrograms)[number])
  ) {
    return { ok: false, error: "Please choose a valid Stellar program." };
  }

  if (!emailPattern.test(enrollment.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (!namePattern.test(enrollment.name)) {
    return { ok: false, error: "Please enter your full name." };
  }

  if (!phonePattern.test(enrollment.phone)) {
    return { ok: false, error: "Please enter a valid phone number." };
  }

  if (!cityPattern.test(enrollment.city)) {
    return { ok: false, error: "Please enter a valid city name." };
  }

  if (!countries.includes(enrollment.country)) {
    return { ok: false, error: "Please select your country." };
  }

  if (enrollment.goal.length < 10 || enrollment.goal.length > 1000) {
    return { ok: false, error: "Please describe your goal using at least 10 characters." };
  }

  return { ok: true, enrollment };
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed." });
  }

  let payload: EnrollmentRequest;
  try {
    payload = getBody(request);
  } catch {
    return response.status(400).json({ error: "Invalid enrollment data." });
  }

  const parsed = parseEnrollment(payload);
  if (!parsed.ok) {
    return response.status(400).json({ error: parsed.error });
  }

  const record = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    ...parsed.enrollment,
  };

  console.info("enrollment.received", record.id, record.program, record.email);

  return response.status(200).json({ ok: true, id: record.id });
}
