const BASE_URL = "https://money-manager-ijje.onrender.com/api/transactions";

export async function getTransactions() {
  const res = await fetch(`${BASE_URL}/transactions`);
  return res.json();
}

export async function addTransaction(data) {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}
