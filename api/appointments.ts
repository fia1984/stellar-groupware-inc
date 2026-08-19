type AppointmentRequest = {
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  country?: string;
  service?: string;
  requirement?: string;
};

type VercelRequest = {
  method?: string;
  body?: AppointmentRequest | string;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const requiredFields: Array<keyof AppointmentRequest> = [
  "date",
  "time",
  "name",
  "phone",
  "email",
  "city",
  "country",
  "service",
  "requirement",
];

function getBody(request: VercelRequest): AppointmentRequest {
  if (typeof request.body === "string") {
    return JSON.parse(request.body) as AppointmentRequest;
  }

  return request.body ?? {};
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed." });
  }

  let appointment: AppointmentRequest;
  try {
    appointment = getBody(request);
  } catch {
    return response.status(400).json({ error: "Invalid appointment data." });
  }

  if (
    requiredFields.some(
      (field) => typeof appointment[field] !== "string" || !appointment[field]?.trim(),
    ) ||
    !emailPattern.test(appointment.email ?? "")
  ) {
    return response.status(400).json({ error: "Please complete all appointment fields." });
  }

  const record = {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    date: appointment.date!.trim(),
    time: appointment.time!.trim(),
    name: appointment.name!.trim(),
    phone: appointment.phone!.trim(),
    email: appointment.email!.trim(),
    city: appointment.city!.trim(),
    country: appointment.country!.trim(),
    service: appointment.service!.trim(),
    requirement: appointment.requirement!.trim(),
  };

  console.info("appointment.received", record.id, record.date, record.time, record.email);

  return response.status(200).json({ ok: true, id: record.id });
}
