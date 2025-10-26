import { useNavigate } from "react-router-dom";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../services/firebase";

export default function FoodCard({ item }) {

  const navigate = useNavigate();

  const handleClaim = async () => {
  if (!item?.id) return;

  const currentQty = Number(item.quantity);
  if (isNaN(currentQty) || currentQty <= 0) return;

  try {
    const ref = doc(db, "foodPosts", item.id);

    await updateDoc(ref, {
      quantity: increment(-1),
      status: currentQty - 1 <= 0 ? "finished" : "available"
    });

    navigate(`/claim/${item.id}`);
  } catch (err) {
    console.error("Claim error:", err);
  }
};


  const timeLeft = () => {
    const now = Date.now();
    const ms = item.expiryTime?.toMillis ? item.expiryTime.toMillis() - now : 0;
    const mins = Math.max(0, Math.floor(ms / 60000));
    return `${mins} min left`;
  };

  return (
    <div className="bg-white text-black rounded shadow p-4">
      <img
        src={item.imageBase64}
        alt={item.foodName}
        className="rounded mb-3 max-h-48 w-full object-cover"
      />

      <h3 className="font-bold">{item.title}</h3>
      <p className="text-sm text-gray-600">
        {item.foodName} • Qty: {item.quantity}
      </p>
      <p className="text-sm">📍 {item.location?.label || "On campus"}</p>
      <p className="text-xs text-gray-500">{timeLeft()}</p>

      <button
        onClick={handleClaim}
        disabled={item.quantity <= 0}
        className="mt-3 inline-block w-full bg-orange-500 text-white px-3 py-2 rounded"
      >
        Claim
      </button>
    </div>
  );
}
