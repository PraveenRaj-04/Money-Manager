export default function Dashboard({ transactions }) {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-green-50 p-6 rounded-xl shadow">
        <p className="text-sm text-gray-600">💰 Income</p>
        <h2 className="text-3xl font-bold text-green-700">₹{income}</h2>
      </div>

      <div className="bg-red-50 p-6 rounded-xl shadow">
        <p className="text-sm text-gray-600">💸 Expense</p>
        <h2 className="text-3xl font-bold text-red-600">₹{expense}</h2>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl shadow">
        <p className="text-sm text-gray-600">📊 Balance</p>
        <h2
          className={`text-3xl font-bold ${
            balance < 0 ? "text-red-600" : "text-blue-700"
          }`}
        >
          ₹{balance}
        </h2>
      </div>
    </div>
  );
}
