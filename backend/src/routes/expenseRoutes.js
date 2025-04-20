// // const express = require("express");
// // const { addExpense, getExpenseById, getAllExpenses, getExpensesSummary, updateExpense, deleteExpense } = require("../models/expenseModel");

// // const router = express.Router();    

// // // ✅ Add a new expense (POST /api/expenses)
// // router.post("/expenses", async (req, res) => {
// //     try {
// //         const { title, amount, category } = req.body;

// //         // Validate required fields
// //         if (!title || !amount || !category) {
// //             return res.status(400).json({ error: "All fields (title, amount, category) are required" });
// //         }

// //         addExpense(req.body, (err, expense) => {
// //             if (err) return res.status(500).json({ error: err.message });
// //             res.status(201).json(expense);
// //         });
// //     } catch (error) {
// //         console.error("❌ Error adding expense:", error);
// //         res.status(500).json({ error: "Internal Server Error" });
// //     }
// // });

// // // ✅ Get all expenses (GET /api/expenses)
// // router.get("/expenses", async (req, res) => {
// //     try {
// //         getAllExpenses((err, expenses) => {
// //             if (err) return res.status(500).json({ error: err.message });
// //             if (expenses.length === 0) {
// //                 return res.status(404).json({ message: "No expenses found" });
// //             }
// //             res.json(expenses);
// //         });
// //     } catch (error) {
// //         console.error("❌ Error fetching expenses:", error);
// //         res.status(500).json({ error: "Internal Server Error" });
// //     }
// // });

// // // ✅ Get a single expense by ID (GET /api/expenses/:id)
// // router.get("/expenses/:id", async (req, res) => {
// //     try {
// //         getExpenseById(req.params.id, (err, expense) => {
// //             if (err) return res.status(500).json({ error: err.message });
// //             if (!expense) return res.status(404).json({ error: "Expense not found" });
// //             res.json(expense);
// //         });
// //     } catch (error) {
// //         console.error("❌ Error fetching expense:", error);
// //         res.status(500).json({ error: "Internal Server Error" });
// //     }
// // });


// // router.put('/expenses/:id', (req, res) => {
// //     const expenseId = req.params.id;
// //     const updatedData = req.body;

// //     updateExpense(expenseId, updatedData, (err, updatedExpense) => {
// //         if (err) {
// //             console.error("❌ Error updating expense:", err);
// //             return res.status(500).json({ error: err.message });
// //         }

// //         res.json({ message: "Expense updated successfully", expense: updatedExpense });
// //     });
// // });


// // // ✅ Get expenses summary (total spent per category) (GET /api/expenses/summary)
// // router.get("/expense/getSum", async (req, res) => {
// //     try {
// //         console.log("here")
// //         getExpensesSummary((err, summary) => {
// //             if (err) return res.status(500).json({ error: err.message });
// //             res.json(summary);
// //         });
// //     } catch (error) {
// //         console.error("❌ Error fetching expenses summary:", error);
// //         res.status(500).json({ error: "Internal Server Error" });
// //     }
// // });

// // router.get("/expenses/summary", async (req, res) => {
// //     try {
// //         getExpensesSummary((err, summary) => {
// //             if (err) return res.status(500).json({ error: err.message });
// //             res.json(summary);
// //         });
// //     } catch (error) {
// //         console.error("❌ Error fetching expenses summary:", error);
// //         res.status(500).json({ error: "Internal Server Error" });
// //     }
// // });

// // // ✅ Delete expense by ID (DELETE /api/expenses/:id)

// // router.delete("/expenses/:id", (req, res) => {
// //     const expenseId = req.params.id;

// //     deleteExpense(expenseId, (err, result) => {
// //         if (err) {
// //             console.error("❌ Error deleting expense:", err);
// //             return res.status(404).json({ error: err.message }); // 404 if not found
// //         }
// //         res.json(result); // Will return { message: "Expense deleted successfully" }
// //     });
// // });



// // module.exports = router;



// const express = require("express");
// const db = require("../config/db"); // DB connection
// const router = express.Router();

// // ✅ Add a new expense
// router.post("/expenses", (req, res) => {
//     const { title, amount, category } = req.body;

//     if (!title || !amount || !category) {
//         return res.status(400).json({ error: "All fields (title, amount, category) are required" });
//     }

//     const sql = "INSERT INTO expenses (title, amount, category) VALUES (?, ?, ?)";
//     db.query(sql, [title, amount, category], (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.status(201).json({ id: result.insertId, title, amount, category });
//     });
// });

// // ✅ Get all expenses
// router.get("/expenses", (req, res) => {
//     const sql = "SELECT * FROM expenses";
//     db.query(sql, (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         if (results.length === 0) {
//             return res.status(404).json({ message: "No expenses found" });
//         }
//         res.json(results);
//     });
// });

// // ✅ Get a single expense by ID
// router.get("/expenses/:id", (req, res) => {
//     const sql = "SELECT * FROM expenses WHERE id = ?";
//     db.query(sql, [req.params.id], (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         if (result.length === 0) {
//             return res.status(404).json({ error: "Expense not found" });
//         }
//         res.json(result[0]);
//     });
// });

// // ✅ Update an expense
// router.put("/expenses/:id", (req, res) => {
//     const { title, amount, category } = req.body;
//     const sql = "UPDATE expenses SET title = ?, amount = ?, category = ? WHERE id = ?";

//     db.query(sql, [title, amount, category, req.params.id], (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: "Expense not found" });
//         }

//         res.json({ message: "Expense updated successfully", expense: { id: req.params.id, title, amount, category } });
//     });
// });

// // ✅ Delete an expense
// router.delete("/expenses/:id", (req, res) => {
//     console.log("🗑️ Deleting expense with ID:", req.params.id); // Add this
//     const sql = "DELETE FROM expenses WHERE id = ?";
//     db.query(sql, [req.params.id], (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: "Expense not found" });
//         }

//         res.json({ message: "Expense deleted successfully" });
//     });
// });


// // ✅ Get expenses summary (group by category)
// router.get("/expenses/summary", (req, res) => {
//     const sql = "SELECT category, SUM(amount) AS total_spent FROM expenses GROUP BY category";
//     db.query(sql, (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json(results);
//     });
// });

// module.exports = router;



const express = require("express");
const db = require("../config/db");
const router = express.Router();

// ✅ Auth check
function isAuthenticated(req, res, next) {
    console.log("🧪 isAuthenticated middleware - req.user:", req.user); // Debugging
  if (req.isAuthenticated() && req.user?.id) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
}

// ✅ Add a new expense
router.post("/expenses", isAuthenticated, async (req, res) => {
  const { title, amount, category, date } = req.body;
  if (!title || !amount || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO expenses (title, amount, category, date, user_id) VALUES (?, ?, ?, ?, ?)",
      [title, amount, category, date || new Date(), req.user.id]
    );
    res.status(201).json({
      message: "Expense added",
      expense: {
        id: result.insertId,
        title,
        amount,
        category,
        date: date || new Date(),
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all expenses for the logged-in user
router.get("/expenses", isAuthenticated, async (req, res) => {
    try {
      console.log("🧪 req.user:", req.user); // Debugging
      const sql = "SELECT * FROM expenses WHERE user_id = ?";
      const [results] = await db.query(sql, [req.user.id]);
      res.json(results);
    } catch (err) {
      console.error("🔥 Error in GET /api/expenses:", err); // Log the error
      res.status(500).json({ error: err.message });
    }
  });
  

// ✅ Get a single expense by ID
router.get("/expenses/:id", isAuthenticated, async (req, res) => {
    try {
        const sql = "SELECT * FROM expenses WHERE id = ? AND user_id = ?";
        const [result] = await db.query(sql, [req.params.id, req.user.id]);

        if (result.length === 0) {
            return res.status(404).json({ error: "Expense not found" });
        }

        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Update an expense
router.put("/expenses/:id", isAuthenticated, async (req, res) => {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category) {
        return res.status(400).json({ error: "All fields (title, amount, category) are required" });
    }

    try {
        const sql = "UPDATE expenses SET title = ?, amount = ?, category = ?, date = ? WHERE id = ? AND user_id = ?";
        const [result] = await db.query(sql, [title, amount, category, date || new Date(), req.params.id, req.user.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Expense not found or not yours" });
        }

        res.json({
            message: "Expense updated successfully",
            expense: { id: req.params.id, title, amount, category, date: date || new Date() }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Delete an expense
router.delete("/expenses/:id", isAuthenticated, async (req, res) => {
    try {
        const sql = "DELETE FROM expenses WHERE id = ? AND user_id = ?";
        const [result] = await db.query(sql, [req.params.id, req.user.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Expense not found or not yours" });
        }

        res.json({ message: "Expense deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get expenses summary for the user
router.get("/expenses/summary", isAuthenticated, async (req, res) => {
    try {
        console.log("User in summary route:", req.user); // 👈 Add this line

        const sql = `
            SELECT category, SUM(amount) AS total_spent 
            FROM expenses 
            WHERE user_id = ?
            GROUP BY category
        `;
        const [results] = await db.query(sql, [req.user.id]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
