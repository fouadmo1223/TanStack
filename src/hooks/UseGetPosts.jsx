import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

const PAGE_SIZE = 6;

// hooks/UseGetPosts.js
export const getPosts = async (status, search, page) => {
  let query = `?_page=${page}&_limit=${PAGE_SIZE}`;

  if (status !== "all") {
    query += `&status=${encodeURIComponent(status)}`;
  }

  if (search) {
    query += `&q=${encodeURIComponent(search)}`;
  }

  const res = await axios.get(`http://localhost:3001/posts${query}`);

  const totalHeader =
    res.headers["x-total-count"] || res.headers["X-Total-Count"];

  return {
    data: res.data,
    total: Number(totalHeader) || 0,
  };
};

const UseGetPosts = (status, search, page) => {
  return useQuery({
    queryKey: ["posts", status, search, page],
    queryFn: () => getPosts(status, search, page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 30,
  });
};

export default UseGetPosts;
export const PAGE_SIZE_CONST = PAGE_SIZE;
