import { useRef, useState } from 'react'
import { db, storage } from '../services/firebase'
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Navbar from '../components/Navbar'
import { classifyImage } from '../utils/aiModel'
import { nutrientFor } from '../utils/nutrients'
import LocationPicker from "../components/LocationPicker";
// import { SUBSCRIBERS } from "../services/subscribers";
// import { sendFoodAlert } from "../services/resend";
import { sendFoodAlert } from "../services/brevo";
import { SUBSCRIBERS } from "../services/subscribers";


export default function Dashboard(){
  const fileRef = useRef(null)
  const previewRef = useRef(null)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [quantity, setQuantity] = useState('')
  const [expiryMins, setExpiryMins] = useState(60)
  const [locationLabel, setLocationLabel] = useState('')
  const [detected, setDetected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  // const [showMap, setShowMap] = useState(false);
  const [locationCoords, setLocationCoords] = useState(null);
  const [location, setLocation] = useState(null);
  const [pickOpen, setPickOpen] = useState(false);




  const onFile = (e)=>{
    const f = e.target.files?.[0]
    if (f){ previewRef.current.src = URL.createObjectURL(f); setDetected(null) }
  }
  const runAI = async () => {
  if (!previewRef.current?.src) return;
  setLoadingAI(true);
  const { label, prob } = await classifyImage(previewRef.current);
  setLoadingAI(false);
  setDetected({ label, prob });
};


  const runAIReal = async ()=>{
    if (!previewRef.current?.src) return
    setLoadingPost(true)
    const {label, prob} = await classifyImage(previewRef.current)
    setLoadingPost(false)
    setDetected({label, prob})
  }

  const submit = async (e) => {
  e.preventDefault();
  
  if (!fileRef.current?.files?.length) return alert("Upload an image");

  setLoading(true);

  const file = fileRef.current.files[0];
  const reader = new FileReader();

  reader.onloadend = async () => {
    const base64Image = reader.result; // <-- Store as Base64

    let foodName = detected?.label || "Unknown";
    const nutrients = nutrientFor(foodName);
    const expiresAt = Timestamp.fromMillis(Date.now() + expiryMins * 60000);

    // await addDoc(collection(db, "foodPosts"), {
    //   title,
    //   desc,
    //   quantity,
    //   imageBase64: base64Image,
    //   foodName,
    //   nutrients,
    //   createdAt: serverTimestamp(),
    //   expiryTime: expiresAt,
    //   status: "available",
    //   location: { label: locationLabel }
    // });
    await addDoc(collection(db, "foodPosts"), {
  title,
  desc,
  quantity: Number(quantity),
  imageBase64: base64Image, // ✅ use correct state that holds Base64
  foodName,
  nutrients,
  createdAt: serverTimestamp(),
  expiryTime: expiresAt,
  status: "available",
  location,
});

for (const email of SUBSCRIBERS) {
  await sendFoodAlert(email, title, location.label);
}
    // Reset form
    setLoading(false);
    alert("Posted and Notification send!");
    setTitle("");
    setDesc("");
    setQuantity("");
    setExpiryMins(60);
    setLocationLabel("");
    setDetected(null);
    if (previewRef.current) previewRef.current.src = "";
    if (fileRef.current) fileRef.current.value = "";

    window.location.href = "/browse";
  };

  reader.readAsDataURL(file);
};




  return (<>
    <Navbar />
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold text-orange-600 mb-4">Post Surplus Food</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea className="w-full border rounded px-3 py-2" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
        <div className="grid grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Quantity (e.g., 10 slices)" value={quantity} onChange={e=>setQuantity(e.target.value)} />
          {/* <input className="border rounded px-3 py-2" placeholder="Pickup Location label" value={locationLabel} onChange={e=>setLocationLabel(e.target.value)} /> */}
          <button
  type="button"   // ✅ prevents form auto-submit
  onClick={() => setPickOpen(true)}
  className={`px-3 py-2 rounded text-white font-semibold ${
    location ? "bg-green-600" : "bg-blue-600"
  }`}
>
  📍 {location?.label || "Select Location"}
</button>


        </div>
        <div className="grid grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" type="number" min="5" step="5" value={expiryMins} onChange={e=>setExpiryMins(Number(e.target.value))} placeholder="Expiry in minutes" />
          <input type="file" accept="image/*" ref={fileRef} onChange={onFile} />
        </div>
        <div className="flex items-center gap-4">
          <img ref={previewRef} alt="preview" className="w-40 h-40 object-cover rounded border" />
          <div>
            <button type="button" onClick={runAI}
  className="bg-orange-500 text-white px-3 py-2 rounded">
  {loadingAI ? "Classifying..." : "Detect Food (AI)"}
</button>

            {detected && <p className="mt-2 text-sm">Detected: <b>{detected.label}</b> ({(detected.prob*100).toFixed(1)}%)</p>}
          </div>
        </div>
        <button type="submit" disabled={loadingPost}
  className="bg-green-600 text-white px-4 py-2 rounded font-semibold">
  {loadingPost ? "Posting..." : "Post"}
</button>

      </form>
    </div>
    {pickOpen && (
  <LocationPicker
    isOpen={pickOpen}
    onClose={() => setPickOpen(false)}
    onSelect={(loc) => setLocation(loc)}
  />
)}


  </>)
}
