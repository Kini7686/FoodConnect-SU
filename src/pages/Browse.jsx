import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { db } from "../services/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import FoodCard from "../components/FoodCard";
import Loader from "../components/Loader";

export default function Browse() {
  const [items, setItems] = useState(null);

  // ✅ Fetch posts live
  useEffect(() => {
    const q = query(
      collection(db, "foodPosts"),
      where("status", "==", "available")
    );

    const unsub = onSnapshot(q, (snap) => {
      const now = Date.now();
      const arr = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((item) => {
          if (!item.expiryTime?.toMillis) return true;
          return item.expiryTime.toMillis() > now;
        });

      setItems(arr);
    });

    return () => unsub();
  }, []);

  // ✅ Refresh UI every 10 seconds so timer removes expired posts without reload
  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => (prev ? [...prev] : null));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {!items ? (
          <Loader />
        ) : items.length === 0 ? (
          <div className="col-span-full text-gray-500 text-center py-10 text-lg">
            No active food available right now 🍽️
          </div>
        ) : (
          items.map((i) => (
            <div
              key={i.id}
              className="animate-fade"
            >
              <FoodCard item={i} />
            </div>
          ))
        )}
      </div>

      {/* ✅ Fade animation */}
      <style>
        {`
          .animate-fade {
            animation: fadeIn 0.25s ease-in;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.97); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </>
  );
}
