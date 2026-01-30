import { useState } from "react";

export default function AddTransaction({ onAdd }) {
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    division: "Personal",
    date: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ ...form, amount: Number(form.amount) });
    setForm({ ...form, amount: "", category: "" });
  }

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-3">
  ➕ Add Transaction
</h2>


      <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleSubmit}>
        <select name="type" onChange={handleChange} className="border p-2 rounded">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          name="amount"
          placeholder="Amount"
          className="border p-2 rounded"
          onChange={handleChange}
          value={form.amount}
        />

        <input
          name="category"
          placeholder="Category"
          className="border p-2 rounded"
          onChange={handleChange}
          value={form.category}
        />

        <select name="division" onChange={handleChange} className="border p-2 rounded">
          <option>Personal</option>
          <option>Office</option>
        </select>

        <input type="date" name="date" className="border p-2 rounded" onChange={handleChange} />

    
<button className="bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg col-span-full">
  Add Transaction
</button>

      </form>
    </div>
  );
}
