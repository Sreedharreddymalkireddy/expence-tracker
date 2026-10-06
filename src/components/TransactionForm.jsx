import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  amount: "",
  type: "expense",
  category: "Food",
  date: new Date().toISOString().split("T")[0]
};

const categories = ["Food", "Travel", "Shopping", "Bills", "Salary", "Other"];

function TransactionForm({
  onAdd,
  onUpdate,
  editingTransaction,
  onCancelEdit
}) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        title: editingTransaction.title,
        amount: String(editingTransaction.amount),
        type: editingTransaction.type,
        category: editingTransaction.category,
        date: editingTransaction.date
      });
    } else {
      setForm(initialForm);
    }
  }, [editingTransaction]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = form.title.trim();
    const amount = Number(form.amount);

    if (!title || !amount || amount <= 0 || !form.date) {
      alert("Please enter a valid title, amount and date.");
      return;
    }

    const transaction = {
      id: editingTransaction ? editingTransaction.id : Date.now(),
      title,
      amount,
      type: form.type,
      category: form.category,
      date: form.date
    };

    if (editingTransaction) {
      onUpdate(transaction);
    } else {
      onAdd(transaction);
      setForm({
        ...initialForm,
        date: new Date().toISOString().split("T")[0]
      });
    }
  };

  return (
    <section className="form-card">
      <div className="section-heading">
        <div>
          <p className="section-label">
            {editingTransaction ? "EDIT TRANSACTION" : "NEW TRANSACTION"}
          </p>
          <h2>{editingTransaction ? "Update transaction" : "Add transaction"}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            placeholder="e.g. Grocery shopping"
            value={form.title}
            onChange={handleChange}
          />
        </label>

        <div className="two-columns">
          <label>
            Amount
            <input
              type="number"
              name="amount"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
            />
          </label>

          <label>
            Type
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
        </div>

        <div className="two-columns">
          <label>
            Category
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            Date
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-actions">
          <button className="primary-button" type="submit">
            {editingTransaction ? "Update Transaction" : "Add Transaction"}
          </button>

          {editingTransaction && (
            <button
              className="secondary-button"
              type="button"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default TransactionForm;