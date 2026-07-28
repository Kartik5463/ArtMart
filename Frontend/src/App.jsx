import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
import PurchasedImages from "./pages/PurchasedImages";
import Settings from "./pages/Settings";
import Sales from "./pages/Sales";
import PhotographerRoute from "./components/PhotographerRoute";
function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
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
        <Route path="/dashboard/upload" element={<PhotographerRoute><Upload /> </PhotographerRoute>} />
        <Route path="/dashboard/myphotos" element={<PhotographerRoute><MyPhotos /> </PhotographerRoute>} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/purchases" element={<PurchasedImages />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/sales" element={<PhotographerRoute><Sales /> </PhotographerRoute>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;