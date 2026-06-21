import { Link } from "react-router-dom";
import { FaYoutube, FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-red-600 font-bold text-2xl"
        >
          <FaYoutube />
          <span>YouTube Clone</span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center border rounded-full overflow-hidden w-[450px]">
          <input
            type="text"
            placeholder="Search videos..."
            className="w-full px-4 py-2 outline-none"
          />

          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200">
            <FaSearch />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;