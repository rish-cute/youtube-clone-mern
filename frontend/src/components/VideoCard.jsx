import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <Link to={`/video/${video._id}`}>
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full aspect-video object-cover"
        />
      </Link>

      <div className="p-3">
        <Link to={`/video/${video._id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-red-600">
            {video.title}
          </h3>
        </Link>

        <Link
          to={`/channel/${video.channel?._id}`}
          className="text-gray-600 text-sm hover:text-red-600 block"
        >
          {video.channel?.channelName}
        </Link>

        <p className="text-gray-500 text-sm">
          {video.views} views
        </p>
      </div>
    </div>
  );
}

export default VideoCard;