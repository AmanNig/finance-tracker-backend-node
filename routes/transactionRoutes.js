const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/auth");
const {
  createTransaction,
  getAllTransactions,
  deleteTransaction
} = require("../controllers/transactionController");

router.post("/", authenticateToken, createTransaction);
router.get("/", authenticateToken, getAllTransactions);
router.delete("/:id", authenticateToken, deleteTransaction);

module.exports = router;
