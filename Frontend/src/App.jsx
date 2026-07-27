import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import PublicRoute from "./components/PublicRoute";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Change_Password_Page from "./pages/Change_Password_Page";
import ProtectedRoute from "./components/ProtectedRoute";
import SideBar from "./components/Sidebar"; // Make sure path matches your file
import Feed from "./pages/Feed";
import Upload from "./pages/Upload";
import MyPhotos from "./pages/MyPhotos";
import Profile from "./pages/Profile";
function App() {
  return (
    <Routes>
      {/* Public pages without Layout */}
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      {/* App pages with Main Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/change-password" element={<Change_Password_Page />} />
      </Route>

      {/* Dashboard Routes with Sidebar */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <SideBar />
          </ProtectedRoute>
        }
      >
        <Route index element={<Feed />} />
        <Route path="/dashboard/upload" element={<Upload />} />
        <Route path="/dashboard/myphotos" element={<MyPhotos />} />
        <Route path="/dashboard/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;