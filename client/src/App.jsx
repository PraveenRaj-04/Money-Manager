import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import { getTransactions, addTransaction } from "./services/api";

export default function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getTransactions();
    setTransactions(data);
  }

  async function handleAdd(tx) {
    await addTransaction(tx);
    load();
  }

  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
  <div className="max-w-5xl mx-auto">
    <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
  💼 Money Manager
</h1>


    <Dashboard transactions={transactions} />
    <AddTransaction onAdd={handleAdd} />
    <TransactionList transactions={transactions} />
  </div>
</div>

  );
}
