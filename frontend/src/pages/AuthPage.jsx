import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/user", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          navigate("/");
        }
      })
      .catch((err) => {
        // Handle the 401 error gracefully
        if (err.response?.status === 401) {
          // Not logged in – totally expected here
          console.log("User not authenticated yet.");
        } else {
          console.error("Error checking user auth:", err);
        }
      });
  }, [navigate]);

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={6} sx={{ p: 4, textAlign: "center", borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>
          Login to Expense Tracker
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Use your Google account to sign in securely.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<GoogleIcon />}
          onClick={handleLogin}
          sx={{ px: 4, py: 1.5, fontWeight: "bold", borderRadius: 2 }}
        >
          Login with Google
        </Button>
      </Paper>
    </Container>
  );
}

export default AuthPage;
