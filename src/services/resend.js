import axios from "axios";

export async function sendFoodAlert(email, title, locationLabel) {
  try {
    const res = await axios.post("http://localhost:3001/api/send-email", {
      email,
      title,
      location: locationLabel,
    });
    console.log("✅ Email sent via local proxy:", res.data);
  } catch (err) {
    console.error("❌ Proxy email failed:", err.message);
  }
}
