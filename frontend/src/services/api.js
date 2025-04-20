import axios from "axios";

// 👇 Use environment variable for API URL (set VITE_API_URL in .env file)
const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true; // ✅ Send cookies with requests

export const getExpenses = async () => {
  const response = await axios.get(`${API_URL}/api/expenses`);
  return response.data;
};

export const addExpense = async (expense) => {
  const response = await axios.post(`${API_URL}/api/expenses`, expense);
  return response.data;
};

export const updateExpense = async (id, expense) => {
  const response = await axios.put(`${API_URL}/api/expenses/${id}`, expense);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await axios.delete(`${API_URL}/api/expenses/${id}`);
  return response.data;
};

export const getExpenseSummary = async () => {
  const response = await axios.get(`${API_URL}/api/expenses/summary`, {
    withCredentials: true,
  });
  return response.data;
};
