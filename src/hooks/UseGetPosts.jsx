import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
  const res = await axios.get("http://localhost:3001/posts");
  return res.data;
};
const UseGetPosts = () => {
  const query = useQuery({
    queryFn: fetchPosts,
    queryKey: ["posts"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  console.log(query.data);
  return query;
};

export default UseGetPosts;
