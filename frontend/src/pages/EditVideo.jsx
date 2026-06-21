import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditVideo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchVideo = async () => {
    try {
      const response = await api.get(`/videos/${id}`);

      setFormData({
        title: response.data.title || "",
        description:
          response.data.description || "",
        thumbnailUrl:
          response.data.thumbnailUrl || "",
        videoUrl:
          response.data.videoUrl || "",
        category:
          response.data.category || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await api.put(
        `/videos/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Video updated successfully");

      navigate(`/video/${id}`);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Update failed"
      );
    }
  };

  if (loading) {
    return (
      <h2 className="text-center text-xl">
        Loading...
      </h2>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6">
        Edit Video
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="thumbnailUrl"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
        >
          Update Video
        </button>
      </form>
    </div>
  );
}

export default EditVideo;