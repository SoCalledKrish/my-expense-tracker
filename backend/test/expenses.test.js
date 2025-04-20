const request = require("supertest");

// Mock the database
jest.mock("../src/config/db", () => ({
  query: jest.fn().mockResolvedValue([[{ id: 1, title: "Test Expense", amount: 100, category: "Food" }]]),
}));

// Mock the `passport` module to bypass its functionality
jest.mock("passport", () => ({
  use: jest.fn(),
  authenticate: () => (req, res, next) => next(),
  initialize: () => (req, res, next) => next(),
  session: () => (req, res, next) => next(),
  serializeUser: jest.fn(),
  deserializeUser: jest.fn(),
}));

// Mock the `passport-google-oauth20` module
jest.mock("passport-google-oauth20", () => ({
  Strategy: jest.fn(),
}));

// Mock the `expenseRoutes` to test routing logic
jest.mock("../src/routes/expenseRoutes", () => {
  const express = require("express");
  const router = express.Router();

  router.get("/expenses", (req, res) => {
    res.json([{ id: 1, title: "Test Expense", amount: 100, category: "Food" }]);
  });

  return router;
});

const app = require("../src/server");

describe("Expense Routes", () => {
  it("should return 200 on GET /api/expenses", async () => {
    const res = await request(app).get("/api/expenses");
    console.log("🔍 Response body:", res.body);

    if (res.statusCode !== 200) {
      console.error("❌ Test failed with:", res.body);
    }

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, title: "Test Expense", amount: 100, category: "Food" }]);
  });
});
