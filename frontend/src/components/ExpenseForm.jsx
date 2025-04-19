import { useState } from "react";
import { addExpense } from "../services/api";
import {
  TextField,
  Button,
  Stack,
  Paper,
  Typography,
} from "@mui/material";

const ExpenseForm = ({ onExpenseAdded }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExpense({ title, amount, category });
    onExpenseAdded();
    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        mb: 4,
        borderRadius: 4,
        backgroundColor: "#1e1e1e", // Dark background
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
        color: "#ffffff", // White text
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: "#ffffff" }}>
        Add a New Expense
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            variant="filled"
            InputProps={{
              style: { backgroundColor: "#2a2a2a", color: "#fff" },
            }}
            InputLabelProps={{ style: { color: "#aaa" } }}
          />
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            variant="filled"
            InputProps={{
              style: { backgroundColor: "#2a2a2a", color: "#fff" },
            }}
            InputLabelProps={{ style: { color: "#aaa" } }}
          />
          <TextField
            fullWidth
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            variant="filled"
            InputProps={{
              style: { backgroundColor: "#2a2a2a", color: "#fff" },
            }}
            InputLabelProps={{ style: { color: "#aaa" } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              minWidth: "150px",
              backgroundColor: "#1976d2",
              color: "#fff",
              '&:hover': {
                backgroundColor: "#1565c0",
              }
            }}
          >
            + Add
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default ExpenseForm;
