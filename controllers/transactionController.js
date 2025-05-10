const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createTransaction = async (req, res) => {
  const userId = req.user.id; // From JWT
  const { type, amount, category, description } = req.body;

  try {
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        type,
        amount,
        category,
        description,
        date: new Date() // Set the current date and time when the transaction is created
      }
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  const userId = req.user.id;

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" } // Order by date, most recent first
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  const userId = req.user.id;
  const id = parseInt(req.params.id);

  try {
    const transaction = await prisma.transaction.findUnique({ where: { id } });

    if (!transaction || transaction.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await prisma.transaction.delete({ where: { id } });
    res.json({ msg: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

