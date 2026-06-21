import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import CommentSection from "../components/CommentSection";
import { Link } from "react-router-dom";

function VideoDetails() {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVideo = async () => {
    try {
      const response = await api.get(`/videos/${id}`);
      setVideo(response.data);
    } catch (error) {
      console.error("Error fetching video:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id]);

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

  return (
    <div className="max-w-5xl mx-auto">
      {/* Video Thumbnail */}
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full max-h-[500px] object-cover rounded-lg mb-6"
      />

      {/* Video Title */}
      <h1 className="text-4xl font-bold mb-4">
        {video.title}
      </h1>

      {/* Video Info */}
      <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
        <span>{video.views} views</span>
        <span>Category: {video.category}</span>
      </div>

      {/* Channel Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Channel
        </h2>

        <Link
        to={`/channel/${video.channel?._id}`}
        className="text-red-600 font-medium hover:underline"
        >
          {video.channel?.channelName || "Unknown Channel"}
          </Link>
      </div>

      {/* Description Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Description
        </h2>

        <p className="text-gray-700">
          {video.description}
        </p>
      </div>

      {/* Comments Section */}
      <CommentSection videoId={id} />
    </div>
  );
}

export default VideoDetails;