import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ setUser }) => {
    const navigate = useNavigate();

  const buttonStyles = {
    color: "#121212",
    backgroundColor: "#f1f1f1",
    borderRadius: "12px",
    textTransform: "none",
    px: 2,
    py: 0.5,
    fontWeight: 500,
    transition: "background-color 0.3s ease, transform 0.2s ease",
    "&:hover": {
      backgroundColor: "#e0e0e0",
      transform: "translateY(-1px)",
    },
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/auth/logout", { withCredentials: true });
      setUser(null); // ⛔ Mark user as logged out
      navigate("/auth");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#121212" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button sx={buttonStyles} onClick={() => navigate("/")}>
            Home
          </Button>
          <Button sx={buttonStyles} onClick={() => navigate("/summary")}>
            Summary
          </Button>
        </Box>
        <Button sx={buttonStyles} onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
