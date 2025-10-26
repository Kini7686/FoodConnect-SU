// src/services/brevo.js
import axios from "axios";

/**
 * Sends an email alert to the given address using the Brevo proxy.
 */
export async function sendFoodAlert(email, title, locationLabel) {
  try {
    const res = await axios.post("http://localhost:3001/api/send-email", {
      email,
      title,
      location: locationLabel,
    });
    console.log("✅ Email sent via Brevo:", res.data);
  } catch (err) {
    console.error("❌ Email send failed:", err.message);
  }
}
