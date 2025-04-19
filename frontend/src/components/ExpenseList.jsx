import { useEffect, useState } from "react";
import {
  getExpenses,
  deleteExpense,
  updateExpense,
} from "../services/api";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  TextField,
  Typography,
  Stack,
  Fade,
  TableContainer,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  const handleEdit = (expense) => {
    setEditId(expense.id);
    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
    });
  };

  const handleUpdate = async () => {
    await updateExpense(editId, formData);
    setEditId(null);
    setFormData({ title: "", amount: "", category: "" });
    fetchExpenses();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        borderRadius: 4,
        backgroundColor: "#1e1e1e",
        color: "#fff",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
        Expense List
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2a2a2a" }}>
              <TableCell sx={{ color: "#fff" }}><strong>Title</strong></TableCell>
              <TableCell sx={{ color: "#fff" }}><strong>Amount (₹)</strong></TableCell>
              <TableCell sx={{ color: "#fff" }}><strong>Category</strong></TableCell>
              <TableCell align="right" sx={{ color: "#fff" }}><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((expense) => (
              <Fade in key={expense.id}>
                <TableRow hover sx={{ backgroundColor: "#292929" }}>
                  {editId === expense.id ? (
                    <>
                      <TableCell>
                        <TextField
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          fullWidth
                          variant="filled"
                          size="small"
                          InputProps={{ style: { backgroundColor: "#3a3a3a", color: "#fff" } }}
                          InputLabelProps={{ style: { color: "#bbb" } }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                          fullWidth
                          variant="filled"
                          size="small"
                          InputProps={{ style: { backgroundColor: "#3a3a3a", color: "#fff" } }}
                          InputLabelProps={{ style: { color: "#bbb" } }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          fullWidth
                          variant="filled"
                          size="small"
                          InputProps={{ style: { backgroundColor: "#3a3a3a", color: "#fff" } }}
                          InputLabelProps={{ style: { color: "#bbb" } }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={handleUpdate} color="success">
                          <SaveIcon />
                        </IconButton>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell sx={{ color: "#eee" }}>{expense.title}</TableCell>
                      <TableCell sx={{ color: "#eee" }}>₹{expense.amount}</TableCell>
                      <TableCell sx={{ color: "#eee" }}>{expense.category}</TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <IconButton onClick={() => handleEdit(expense)} color="primary">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(expense.id)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              </Fade>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={expenses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          color: "#fff",
          ".MuiSelect-icon": { color: "#fff" },
          ".MuiInputBase-root": {
            color: "#fff",
          },
          ".MuiTablePagination-selectLabel": { color: "#bbb" },
          ".MuiTablePagination-displayedRows": { color: "#bbb" },
        }}
      />
    </Paper>
  );
};

export default ExpenseList;
