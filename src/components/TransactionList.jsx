import { useState } from "react";

function TransactionList({
  transactions,
  onEdit,
  onDelete,
  formatAmount
}) {
  const [filter, setFilter] = useState("all");

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((transaction) => transaction.type === filter);

  return (
    <section className="list-card">
      <div className="list-header">
        <div>
          <p className="section-label">TRANSACTIONS</p>
          <h2>Recent activity</h2>
        </div>

        <select
          className="filter-select"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">₹</div>
          <h3>No transactions yet</h3>
          <p>Add your first income or expense to start tracking.</p>
        </div>
      ) : (
        <div className="transaction-list">
          {filteredTransactions.map((transaction) => (
            <article className="transaction-item" key={transaction.id}>
              <div
                className={`transaction-icon ${
                  transaction.type === "income" ? "income-icon" : "expense-icon"
                }`}
              >
                {transaction.type === "income" ? "+" : "−"}
              </div>

              <div className="transaction-details">
                <h3>{transaction.title}</h3>
                <p>
                  {transaction.category} •{" "}
                  {new Date(`${transaction.date}T00:00:00`).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    }
                  )}
                </p>
              </div>

              <div
                className={`transaction-amount ${
                  transaction.type === "income" ? "income-text" : "expense-text"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatAmount(transaction.amount)}
              </div>

              <div className="item-actions">
                <button onClick={() => onEdit(transaction)} aria-label="Edit transaction">
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => onDelete(transaction.id)}
                  aria-label="Delete transaction"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default TransactionList;