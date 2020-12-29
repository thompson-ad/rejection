/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

// Our http function now takes in a generic parameter for the type of the response body
// in the consuming code, our data variable will be strongly typed to whatever T is
export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);
  try {
    // may error if there is no body
    response.parsedBody = await response.json();
  } catch (error) {
    console.error(error);
  }
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

// GET
export async function get<T>(path: string, args: RequestInit = { method: 'get' }): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

// POST
export async function post<T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'post', body: JSON.stringify(body) },
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

// PUT
export async function put<T>(
  path: string,
  body: any,
  args: RequestInit = { method: 'put', body: JSON.stringify(body) },
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args));
}
