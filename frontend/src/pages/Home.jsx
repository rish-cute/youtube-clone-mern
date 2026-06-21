import { useEffect, useState } from "react";
import api from "../services/api";
import VideoCard from "../components/VideoCard";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
        const response = await api.get("/videos");
        console.log("API Response:", response.data);
        setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <h2 className="text-center text-xl">
        Loading videos...
      </h2>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Recommended Videos
      </h1>

      {videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
