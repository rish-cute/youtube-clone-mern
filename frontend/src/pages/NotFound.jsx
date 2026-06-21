import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-7xl font-bold text-red-600 mb-4">
        404
      </h1>

      <h2 className="text-3xl font-semibold mb-3">
        Page Not Found
      </h2>

      <p className="text-gray-600 mb-6">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
