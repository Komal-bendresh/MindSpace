
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import JournalEntry from "./pages/JournalEntry";
import Analytics from "./pages/Analytics";
import { ThemeProvider } from "./context/ThemeContext";
import AIChat from "./pages/AIChat";
import PrivateRoute from "./components/PrivateRoute"; // ✅ add this
import AdminDashboard from "./admin/AdminDashboard";
import AdminRoute from "./admin/AdminRoute";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />

            {/* 🔒 Protected Routes */}
            <Route
              path="/journal"
              element={
                <PrivateRoute>
                  <JournalEntry />
                </PrivateRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <AIChat />
                </PrivateRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <PrivateRoute>
                  <Analytics />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
          path="/admin"
          element={
         
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
           
          }
        />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
