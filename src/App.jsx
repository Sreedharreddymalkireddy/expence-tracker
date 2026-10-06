import { useEffect, useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

const STORAGE_KEY = "expense-tracker-transactions";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem(STORAGE_KEY);
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((currentTransactions) => [
      transaction,
      ...currentTransactions
    ]);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions((currentTransactions) =>
      currentTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );
    setEditingTransaction(null);
  };

  const deleteTransaction = (id) => {
    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== id)
    );

    if (editingTransaction?.id === id) {
      setEditingTransaction(null);
    }
  };

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2
    }).format(amount);

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">PERSONAL FINANCE</p>
          <h1>Expense Tracker</h1>
          <p className="subtitle">
            Track your income and expenses in one simple place.
          </p>
        </div>
      </header>

      <main className="container">
        <section className="summary-grid">
          <div className="summary-card balance-card">
            <span>Current Balance</span>
            <strong>{formatAmount(balance)}</strong>
          </div>

          <div className="summary-card income-card">
            <span>Total Income</span>
            <strong>{formatAmount(totalIncome)}</strong>
          </div>

          <div className="summary-card expense-card">
            <span>Total Expense</span>
            <strong>{formatAmount(totalExpense)}</strong>
          </div>
        </section>

        <section className="content-grid">
          <TransactionForm
            onAdd={addTransaction}
            onUpdate={updateTransaction}
            editingTransaction={editingTransaction}
            onCancelEdit={() => setEditingTransaction(null)}
          />

          <TransactionList
            transactions={transactions}
            onEdit={setEditingTransaction}
            onDelete={deleteTransaction}
            formatAmount={formatAmount}
          />
        </section>
      </main>
    </div>
  );
}

export default App;