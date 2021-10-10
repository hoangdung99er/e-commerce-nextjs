import useSWR from "swr";
import fetch from "isomorphic-unfetch";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
const fetcherPost = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
const baseUrl = "http://localhost:3000/api";

export const useRequestApi = (path) => {
  if (!path) {
    throw new Error("Path is required");
  }

  const url = baseUrl + path;

  const { data, error } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
  });

  return { data, error };
};
