import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <Link
      to={`/video/${video._id}`}
      className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
    >
      <img
      src={video.thumbnailUrl}
      alt={video.title}
      className="w-full aspect-video object-cover"
      />

      <div className="p-3">
        <h3 className="font-semibold text-lg mb-2">
          {video.title}
        </h3>

        <p className="text-gray-600 text-sm">
          {video.channel?.channelName}
        </p>

        <p className="text-gray-500 text-sm">
          {video.views} views
        </p>
      </div>
    </Link>
  );
}

export default VideoCard;