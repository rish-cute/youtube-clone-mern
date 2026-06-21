import {
  FaHome,
  FaBook,
  FaCode,
  FaLaptopCode,
  FaGamepad,
  FaMusic,
} from "react-icons/fa";

function Sidebar({
  selectedCategory,
  setSelectedCategory,
}) {
  const items = [
    { name: "All", icon: <FaHome /> },
    { name: "Education", icon: <FaBook /> },
    { name: "Programming", icon: <FaCode /> },
    { name: "Technology", icon: <FaLaptopCode /> },
    { name: "Gaming", icon: <FaGamepad /> },
    { name: "Music", icon: <FaMusic /> },
  ];

  return (
    <aside className="w-60 bg-white rounded-xl shadow p-4 h-fit">
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() =>
            setSelectedCategory(item.name)
          }
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-left ${
            selectedCategory === item.name
              ? "bg-red-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {item.icon}
          {item.name}
        </button>
      ))}
    </aside>
  );
}

export default Sidebar;