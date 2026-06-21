import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import VideoCard from "../components/VideoCard";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");

  const fetchVideos = async () => {
    try {
      let response;

      if (search) {
        response = await api.get(
          `/videos/search?search=${search}`
        );
      } else {
        response = await api.get("/videos");
      }

      setVideos(response.data);
    } catch (error) {
      console.error(
        "Error fetching videos:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [search]);

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
        {search
          ? `Search Results: ${search}`
          : "Recommended Videos"}
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
