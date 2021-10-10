import fetch from "isomorphic-unfetch";

export default async function apiCall(
  endpoint,
  method = "GET",
  body = null,
  headers = {}
) {
  let err = {};
  const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN;
  try {
    const response = await fetch(`${SERVER_DOMAIN}/${endpoint}`, {
      method,
      body: method === "GET" ? null : JSON.stringify(body),
      headers: headers,
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    err.message = error;
    return err;
  }
}
