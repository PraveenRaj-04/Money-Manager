export default function TransactionList({ transactions }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Transactions
      </h2>

      {transactions.length === 0 && (
        <p className="text-gray-500 text-sm">No transactions yet</p>
      )}

      <div className="divide-y">
        {transactions.map((t) => (
          <div
            key={t._id}
            className="flex justify-between items-center py-3"
          >
            {/* Left side */}
            <div>
              <p className="font-semibold text-gray-800">
                {t.category}
              </p>
              <p className="text-xs text-gray-500">
                {t.division}
              </p>
            </div>

            {/* Right side */}
            <p
              className={`font-bold ${
                t.type === "income"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              ₹{t.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
