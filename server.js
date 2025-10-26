// server.js
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Your actual Brevo API key (safe to use locally)
const BREVO_API_KEY = "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";

// ✅ Simple test route to confirm server is running
app.get("/", (req, res) => {
  res.send("🚀 FoodConnectSU Brevo Mail Proxy is running!");
});

// ✅ Route to send email through Brevo
app.post("/api/send-email", async (req, res) => {
  const { email, title, location } = req.body;

  // Validate input
  if (!email || !title || !location) {
    return res.status(400).json({ error: "Missing email, title, or location" });
  }

  try {
    // Send email using Brevo transactional API
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "FoodConnectSU",
          email: "ompatil9082154@gmail.com" // can be any valid sender
        },
        to: [{ email }],
        subject: `🍛 New Food Available: ${title}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif;">
            <h2 style="color: #F76900;">🍱 ${title}</h2>
            <p>New food is available at <b>${location}</b>.</p>
            <p>Visit <b>FoodConnectSU</b> now to claim it!</p>
            <br/>
            <a href="http://localhost:5173/browse" 
               style="display:inline-block;background:#F76900;color:white;padding:10px 15px;
               border-radius:5px;text-decoration:none;">Claim Now</a>
            <hr/>
            <p style="font-size:12px;color:#777;">
              Sent automatically by FoodConnectSU — Campus to Community
            </p>
          </div>
        `
      },
      {
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Brevo Email Sent:", response.status);
    res.json({ success: true, data: response.data });
  } catch (err) {
    console.error("❌ Brevo Error →", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// Start the local proxy server
const PORT = 3001;
app.listen(PORT, () =>
  console.log(`✅ Local proxy running at http://localhost:${PORT}`)
);
