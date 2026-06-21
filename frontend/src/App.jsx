import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoDetails from "./pages/VideoDetails";
import Channel from "./pages/Channel";
import NotFound from "./pages/NotFound";
import UploadVideo from "./pages/UploadVideo";
import EditVideo from "./pages/EditVideo";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/video/:id"
            element={<VideoDetails />}
          />

          <Route
            path="/edit-video/:id"
            element={<EditVideo />}
          />

          <Route
            path="/channel/:id"
            element={<Channel />}
          />

          <Route
            path="/upload"
            element={<UploadVideo />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
