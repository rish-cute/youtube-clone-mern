import { useEffect, useState } from "react";
import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";
import api from "../services/api";
import CommentSection from "../components/CommentSection";
import {
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";

function VideoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const fetchVideo = async () => {
    try {
      const response = await api.get(`/videos/${id}`);

      setVideo(response.data);

      setLikes(response.data.likes || 0);
      setDislikes(response.data.dislikes || 0);
    } catch (error) {
      console.error(
        "Error fetching video:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmed) return;

    try {
      const token =
        localStorage.getItem("token");

      await api.delete(`/videos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Video deleted successfully");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl">
        Loading video...
      </div>
    );
  }

  if (!video) {
    return (
      <div className="text-center text-red-600 text-xl">
        Video not found.
      </div>
    );
  }

  const isOwner =
    user.id === video.owner?._id;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Thumbnail */}
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full max-h-[500px] object-cover rounded-lg mb-6"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">
        {video.title}
      </h1>

      {/* Video Info */}
      <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
        <span>{video.views} views</span>

        <span>
          Category: {video.category}
        </span>

        {isOwner && (
          <>
            <button
              onClick={() =>
                navigate(`/edit-video/${id}`)
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Video
            </button>

            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete Video
            </button>
          </>
        )}

        <button
          onClick={() =>
            setLikes((prev) => prev + 1)
          }
          className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg hover:bg-green-200"
        >
          <FaThumbsUp />
          {likes}
        </button>

        <button
          onClick={() =>
            setDislikes(
              (prev) => prev + 1
            )
          }
          className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-lg hover:bg-red-200"
        >
          <FaThumbsDown />
          {dislikes}
        </button>
      </div>

      {/* Channel */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Channel
        </h2>

        <Link
          to={`/channel/${video.channel?._id}`}
          className="text-red-600 font-medium hover:underline"
        >
          {video.channel?.channelName ||
            "Unknown Channel"}
        </Link>
      </div>

      {/* Description */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Description
        </h2>

        <p className="text-gray-700">
          {video.description}
        </p>
      </div>

      {/* Comments */}
      <CommentSection videoId={id} />
    </div>
  );
}

export default VideoDetails;