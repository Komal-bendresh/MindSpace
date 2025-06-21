import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import JournalEntry from "./pages/JournalEntry";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
          <Route path="/journal" element={<JournalEntry/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
