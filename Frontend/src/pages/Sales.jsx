import { useEffect, useState } from "react";
import useAuthStore from "../store/UseAuthStore";

const Sales = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();
  
  useEffect(() => {
    const getSales = async () => {
      

      try {
        setLoading(true);

        const res = await fetch("http://localhost:5000/api/transaction/sales", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();
        console.log("Sales response:", result);
        setTransactions(result.sales || []);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    getSales();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">My Sales</h1>
        <span className="text-slate-500">{transactions.length} Sales</span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg font-medium text-gray-500">
            Loading your sales...
          </p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="h-64 rounded-2xl border-2 border-dashed border-gray-300 bg-white flex items-center justify-center">
          <p className="text-gray-400 text-lg">No Sales Yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={
                  transaction.photo?.imageUrl?.startsWith("http")
                    ? transaction.photo.imageUrl
                    : `http://localhost:5000${transaction.photo?.imageUrl}`
                }
                alt={transaction.photo?.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  {transaction.photo?.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                  {transaction.photo?.description}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Sold to</span>
                    <span className="text-sm font-medium text-slate-800">
                      {transaction.buyer?.name||"N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                 <span className="text-sm text-slate-500">Buyer Email</span>
                    <span className="text-sm font-medium text-slate-800">
                      {transaction.buyer?.email||"N/A"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Date</span>
                    <span className="text-sm font-medium text-slate-800">
                         {new Date(transaction.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-slate-500">Amount</span>
                    <span className="text-lg font-bold text-emerald-600">
                      ${transaction .amount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sales;