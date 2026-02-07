import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Fetch a single post by ID
const getPost = async (id) => {
  const res = await axios.get(`http://localhost:3001/posts/${id}`);
  return res.data;
};

// Custom hook for React Query
const UseGetPost = (id) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    enabled: !!id, // only fetch if id exists
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

export default UseGetPost;
