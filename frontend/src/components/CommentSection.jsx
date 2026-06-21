import { useEffect, useState } from "react";
import api from "../services/api";

function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  const [editingCommentId, setEditingCommentId] =
    useState(null);

  const [editText, setEditText] =
    useState("");

  const token = localStorage.getItem("token");

  const fetchComments = async () => {
    try {
      const response = await api.get(
        `/comments/${videoId}`
      );

      setComments(response.data);
    } catch (error) {
      console.error(
        "Error fetching comments:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    try {
      await api.post(
        `/comments/${videoId}`,
        {
          text: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCommentText("");

      fetchComments();
    } catch (error) {
      console.error(
        "Error adding comment:",
        error
      );
    }
  };

  const handleDeleteComment = async (
    commentId
  ) => {
    try {
      await api.delete(
        `/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchComments();
    } catch (error) {
      console.error(
        "Error deleting comment:",
        error
      );
    }
  };

  const handleUpdateComment = async (
    commentId
  ) => {
    try {
      await api.put(
        `/comments/${commentId}`,
        {
          text: editText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditingCommentId(null);
      setEditText("");

      fetchComments();
    } catch (error) {
      console.error(
        "Error updating comment:",
        error
      );
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

      {token && (
        <form
          onSubmit={handleAddComment}
          className="mb-6"
        >
          <textarea
            value={commentText}
            onChange={(e) =>
              setCommentText(e.target.value)
            }
            placeholder="Write a comment..."
            rows="3"
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="mt-3 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
          >
            Add Comment
          </button>
        </form>
      )}

      {!token && (
        <p className="text-gray-500 mb-6">
          Login to add a comment.
        </p>
      )}

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
                {comment.user?.username ||
                  "Unknown User"}
              </p>

              {editingCommentId ===
              comment._id ? (
                <>
                  <textarea
                    value={editText}
                    onChange={(e) =>
                      setEditText(
                        e.target.value
                      )
                    }
                    className="w-full border rounded-lg p-2 mt-2"
                  />

                  <button
                    onClick={() =>
                      handleUpdateComment(
                        comment._id
                      )
                    }
                    className="mt-2 mr-3 text-blue-600 hover:underline"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => {
                      setEditingCommentId(
                        null
                      );
                      setEditText("");
                    }}
                    className="mt-2 text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-700 mt-1">
                    {comment.text}
                  </p>

                  {token && (
                    <div className="flex gap-4 mt-2">
                      <button
                        onClick={() => {
                          setEditingCommentId(
                            comment._id
                          );

                          setEditText(
                            comment.text
                          );
                        }}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteComment(
                            comment._id
                          )
                        }
                        className="text-red-600 text-sm hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentSection;