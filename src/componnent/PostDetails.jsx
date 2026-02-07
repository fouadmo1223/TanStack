import { useParams, useNavigate } from "react-router-dom";
import UseGetPost from "../hooks/UseGetPost";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const postQuery = UseGetPost(id);

  if (postQuery.isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        Loading post...
      </div>
    );
  }

  if (!postQuery.data) {
    return (
      <div className="h-screen flex items-center justify-center text-red-400">
        Post not found.
      </div>
    );
  }

  const post = postQuery.data;

  return (
    <div className="min-h-screen bg-[#0f1115] text-white flex flex-col items-center justify-start pt-16 px-4">
      <div className="max-w-3xl w-full bg-[#121214] border border-white/10 rounded-3xl p-8 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-black">{post.title}</h1>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
              Status: {post.status}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 transition text-gray-300"
          >
            ← Back
          </button>
        </div>

        {/* Content */}
        <div className="text-gray-300 leading-relaxed space-y-4">
          <p>{post.content || "No content available."}</p>
        </div>

        {/* Footer */}
        {post.topRate && (
          <div className="mt-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400">
              ⭐ Top Rated
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
