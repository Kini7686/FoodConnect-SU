import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import QR from "../utils/generateQR";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Claim() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [minsLeft, setMinsLeft] = useState(0);
  useEffect(() => {
  // Disable scroll for this page only
  document.body.classList.add("no-scroll");

  return () => {
    // Restore scroll when leaving page
    document.body.classList.remove("no-scroll");
  };
}, []);


  useEffect(() => {
    const fetchData = async () => {
      const d = await getDoc(doc(db, "foodPosts", id));
      if (d.exists()) {
        const postData = { id: d.id, ...d.data() };
        setPost(postData);

        if (postData.expiryTime?.toMillis) {
          const updateTimer = () => {
            const now = Date.now();
            const ms = postData.expiryTime.toMillis() - now;
            const mins = Math.max(0, Math.floor(ms / 60000));
            setMinsLeft(mins);
          };

          updateTimer(); 
          const interval = setInterval(updateTimer, 30000);
          return () => clearInterval(interval);
        }
      }
    };
    
    fetchData();
  }, [id]);

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-screen text-gray-700 text-lg">
          Loading...
        </div>
      </>
    );
  }

  return (
  <>
    <Navbar />

    <div className="min-h-screen bg-[#FAF1DF] flex justify-center items-center p-6">

      <div className="bg-white w-[650px] shadow-xl rounded-2xl p-10 border border-gray-200
                      transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] relative">

        {/* Time Badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs 
                        px-4 py-1 rounded-full shadow font-medium">
          ⏱ {minsLeft} min left
        </div>

        {/* Add spacing under time */}
        <div className="h-6" />

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Show this QR at Pickup ✅
        </h2>

        {/* QR Container */}
        <div className="relative flex justify-center bg-gray-50 rounded-2xl p-8 mb-10 
                        border border-gray-100 shadow-inner">
          <div className="absolute inset-0 flex justify-center items-center opacity-[0.05]">
            {/* <span className="text-[180px] font-extrabold tracking-widest text-gray-700 select-none">
              SU
            </span> */}
          </div>
          <QR value={id} size={240} />
        </div>

        {/* Food Details */}
        <div className="space-y-3 text-center mb-10">
          <p className="text-xl font-semibold text-gray-900">{post.title}</p>
          <p className="text-sm text-gray-700">🍽 {post.foodName}</p>
          <p className="text-sm text-gray-700">
            📦 Remaining: <span className="font-bold">{post.quantity}</span>
          </p>
        {post.location?.lat && post.location?.lng ? (
  <a
    href={`https://www.google.com/maps/search/?api=1&query=${post.location.lat},${post.location.lng}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm text-blue-600 hover:underline flex justify-center items-center gap-1"
  >
    📍 {post.location.label || "Pickup Location"}  
    <span className="text-xs bg-green-200 px-2 py-[1px] rounded-full font-medium">
      Open in Maps
    </span>
  </a>
) : (
  <p className="text-sm text-gray-700">
    📍 On Campus
  </p>
)}

          <p className="text-xs text-gray-500">✅ Verified at pickup</p>
        </div>

        {/* Now button is below verified text */}
        <button
          onClick={() => navigate("/browse")}
          className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg 
                     font-semibold text-[15px] shadow-md transition"
        >
          ← Back to Browse
        </button>

      </div>
    </div>
  </>
);
}