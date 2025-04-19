const db = require("../config/db"); // Import the database connection

// ✅ Add an Expense
const addExpense = (expense, callback) => {
    const { title, amount, category } = expense;
    const sql = "INSERT INTO expenses (title, amount, category) VALUES (?, ?, ?)";
    db.query(sql, [title, amount, category], (err, result) => {
        if (err) return callback(err, null);
        callback(null, { id: result.insertId, ...expense });
    });
};

// ✅ Get Expense by ID
const getExpenseById = (id, callback) => {
    const sql = "SELECT * FROM expenses WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result[0] || null);
    });
};

// ✅ Get All Expenses
const getAllExpenses = (callback) => {
    const sql = "SELECT * FROM expenses";
    db.query(sql, (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};

const updateExpense = (id, expense, callback) => {
    const { title, amount, category } = expense;
    const sql = "UPDATE expenses SET title = ?, amount = ?, category = ? WHERE id = ?";

    db.query(sql, [title, amount, category, id], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            if (result.affectedRows === 0) {
                return callback(new Error("Expense not found"), null);
            }
            callback(null, { id, ...expense });
        }
    });
};



// ✅ Get Expenses Summary (Group by Category)
const getExpensesSummary = (callback) => {
    const sql = "SELECT category, SUM(amount) AS total_spent FROM expenses GROUP BY category";
    db.query(sql, (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};

const deleteExpense = (id, callback) => {
    const sql = "DELETE FROM expenses WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        if (result.affectedRows === 0) {
            return callback(new Error("Expense not found"), null);
        }
        callback(null, { message: "Expense deleted successfully" });
    });
};


// Export all functions
module.exports = { addExpense, getExpenseById, getAllExpenses, getExpensesSummary, updateExpense, deleteExpense };
