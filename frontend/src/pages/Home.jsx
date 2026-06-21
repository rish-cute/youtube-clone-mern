import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import VideoCard from "../components/VideoCard";
import Sidebar from "../components/Sidebar";

function Home() {
  const [videos, setVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

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
      setAllVideos(response.data);
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

  useEffect(() => {
    if (selectedCategory === "All") {
      setVideos(allVideos);
    } else {
      const filtered = allVideos.filter(
        (video) =>
          video.category === selectedCategory
      );

      setVideos(filtered);
    }
  }, [selectedCategory, allVideos]);

  if (loading) {
    return (
      <h2 className="text-center text-xl">
        Loading videos...
      </h2>
    );
  }

  return (
    <div className="flex gap-6">
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="flex-1">
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
    </div>
  );
}

export default Home;
