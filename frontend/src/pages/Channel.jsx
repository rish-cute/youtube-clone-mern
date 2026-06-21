import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function Channel() {
  const { id } = useParams();

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChannel = async () => {
    try {
      const response = await api.get(`/channels/${id}`);

      setChannel(response.data.channel);
      setVideos(response.data.videos);
    } catch (error) {
      console.error(
        "Error fetching channel:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannel();
  }, [id]);

  if (loading) {
    return (
      <h2 className="text-center text-xl">
        Loading channel...
      </h2>
    );
  }

  if (!channel) {
    return (
      <h2 className="text-center text-red-600 text-xl">
        Channel not found.
      </h2>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h1 className="text-4xl font-bold mb-3">
          {channel.channelName}
        </h1>

        <p className="text-gray-700 mb-4">
          {channel.description ||
            "No description available."}
        </p>

        <div className="flex flex-wrap gap-6 text-gray-600">
          <p>
            Owner:
            {" "}
            {channel.owner?.username}
          </p>

          <p>
            Subscribers:
            {" "}
            {channel.subscribersCount}
          </p>

          <p>
            Videos:
            {" "}
            {videos.length}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">
        Channel Videos
      </h2>

      {videos.length === 0 ? (
        <div className="bg-white rounded-lg p-6 shadow">
          No videos uploaded yet.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Link
              key={video._id}
              to={`/video/${video._id}`}
              className="bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">
                  {video.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {video.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Channel;
