import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateChannel() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    channelName: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response = await api.post(
        "/channels",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        "Channel created successfully!"
      );

      setTimeout(() => {
        navigate(
          `/channel/${response.data.channel._id}`
        );
      }, 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to create channel"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-3xl font-bold text-center mb-6">
        Create Channel
      </h1>

      {message && (
        <div className="mb-4 p-3 rounded bg-gray-100">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="channelName"
          placeholder="Channel Name"
          value={formData.channelName}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Channel Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
        >
          {loading
            ? "Creating..."
            : "Create Channel"}
        </button>
      </form>
    </div>
  );
}

export default CreateChannel;