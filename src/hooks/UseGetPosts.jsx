import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

const PAGE_SIZE = 6;

// hooks/UseGetPosts.js
export const getPosts = async (status, search, page) => {
  const res = await axios.get("http://localhost:3001/posts", {
    params: {
      _limit: PAGE_SIZE,
      _page: page,
      ...(status !== "all" && { status }),
      ...(search && { q: search }),
    },
  });

  // Check both lowercase and PascalCase for compatibility
  const totalHeader =
    res.headers["x-total-count"] || res.headers["X-Total-Count"];

  return {
    data: res.data,
    total: parseInt(totalHeader || 0, 10),
  };
};
const UseGetPosts = (status, search, page) => {
  return useQuery({
    queryKey: ["posts", status, search, page],
    queryFn: () => getPosts(status, search, page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 30, // ✅ Refetch data every 30 minutes
  });
};

export default UseGetPosts;
export const PAGE_SIZE_CONST = PAGE_SIZE;
