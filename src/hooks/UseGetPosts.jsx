import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

const getPosts = async (status, search) => {
  const res = await axios.get("http://localhost:3001/posts", {
    params: {
      ...(status !== "all" && { status }),
      ...(search && { q: search }),
    },
  });
  return res.data;
};

const UseGetPosts = (status, search) => {
  return useQuery({
    queryKey: ["posts", status, search],
    queryFn: () => getPosts(status, search),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData, // ✅ Modern way to keep data during search
  });
};

export default UseGetPosts;
