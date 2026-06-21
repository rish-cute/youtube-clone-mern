import { useEffect, useState } from "react";
import api from "../services/api";

function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comments/${videoId}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4">
        Comments ({comments.length})
      </h2>

      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="border-b pb-3"
            >
              <p className="font-semibold">
                {comment.user?.username || "Unknown User"}
              </p>

              <p className="text-gray-700 mt-1">
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentSection;