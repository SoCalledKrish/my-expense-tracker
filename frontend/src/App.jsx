import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home";
import Summary from "./pages/Summary";
import AuthPage from "./pages/AuthPage";
import axios from "axios";
import Navbar from "./components/Navbar";

const theme = createTheme();
function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      axios
        .get("http://localhost:5000/auth/user", { withCredentials: true })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          setUser(null);
          setLoading(false);
        });
    }, []);
  
    if (loading) return null;
  
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {user && <Navbar setUser={setUser} />} {/* 🧠 Pass it in */}
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/auth" />} />
            <Route path="/summary" element={user ? <Summary /> : <Navigate to="/auth" />} />
            <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }

export default App;
