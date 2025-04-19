import { Button, Card, Typography } from "@mui/material";

const AuthFlipCard = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <Card sx={{ p: 4, textAlign: "center", minWidth: 300 }}>
      <Typography variant="h5" mb={2}>Login with Google</Typography>
      <Button variant="contained" fullWidth onClick={handleGoogleLogin}>
        Sign in with Google
      </Button>
    </Card>
  );
};

export default AuthFlipCard;
