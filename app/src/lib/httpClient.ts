import type { ZodSchema } from "zod";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type QueryParams = Record<string, string | number | boolean>;

type BaseOptions<T> = {
  headers?: HeadersInit;
  query?: QueryParams;
  credentials?: RequestCredentials;
  schema?: ZodSchema<T>;
};

type HttpClientConfig = {
  baseUrl: string;
  defaultHeaders?: HeadersInit;
};

type RequestParams<T> = {
  method: HttpMethod;
  baseUrl: string;
  path: string;
  body?: unknown;
  options?: BaseOptions<T>;
  defaultHeaders: HeadersInit;
};

const buildUrl = (base: string, path: string, query?: QueryParams) => {
  const url = new URL(path, base);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.append(key, String(value));
    }
  }

  return url.toString();
};

const request = async <T>({
  method,
  baseUrl,
  path,
  body,
  options = { credentials: "same-origin" },
  defaultHeaders = {},
}: RequestParams<T>): Promise<T> => {
  const url = buildUrl(baseUrl, path, options.query);
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: options.credentials,
    body: JSON.stringify(body),
  });
  const raw = await response.text();

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${raw}`);
  }

  const json = JSON.parse(raw);

  if (options.schema) {
    const parsed = options.schema.safeParse(json);
    if (!parsed.success) {
      console.error("🚨", parsed.error);
      throw new Error("Invalid response structure");
    }
    return parsed.data;
  }

  return json;
};

export function createHttpClient({
  baseUrl,
  defaultHeaders = {},
}: HttpClientConfig) {
  return {
    get: <T>(path: string, options?: BaseOptions<T>) =>
      request<T>({
        method: "GET",
        baseUrl,
        path,
        options,
        defaultHeaders,
      }),

    post: <T>(path: string, body?: unknown, options?: BaseOptions<T>) =>
      request<T>({
        method: "POST",
        baseUrl,
        path,
        body,
        options,
        defaultHeaders,
      }),

    put: <T>(path: string, body?: unknown, options?: BaseOptions<T>) =>
      request<T>({
        method: "PUT",
        baseUrl,
        path,
        body,
        options,
        defaultHeaders,
      }),

    delete: <T>(path: string, options?: BaseOptions<T>) =>
      request<T>({
        method: "DELETE",
        baseUrl,
        path,
        options,
        defaultHeaders,
      }),
  };
}
