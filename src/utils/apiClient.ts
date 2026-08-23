type ErrorBody = {
  error?: string;
};

export function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export async function postJson(
  path: string,
  body: unknown,
  fallbackError: string,
) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = (await response.json().catch(() => null)) as ErrorBody | null;

  if (!response.ok) {
    throw new Error(result?.error || fallbackError);
  }

  return result;
}
