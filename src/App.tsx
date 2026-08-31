import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Photos from "./pages/Photos";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const Layout = () => (
  <>
    <Navbar />
    <main className="max-w-7xl mx-auto p-6">
      <Outlet />
    </main>
  </>
);

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/photos" element={<Photos />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
