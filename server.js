const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Variabel penampung donasi terakhir
let latestDonation = null;

// ==========================================
// ENDPOINT UTAMA: MENERIMA DONASI ASLI
// ==========================================
app.post("/webhook", (req, res) => {
  const data = req.body;
  console.log("Menerima Webhook Asli:", data);

  // Mengambil data murni langsung dari SociaBuzz
  latestDonation = {
    id: Date.now().toString(),
    name: data.supporter_name || "Seseorang",
    amount: data.amount || 0, // <-- Menggunakan nominal asli dari pendonor!
    message: data.message || ""
  };

  res.status(200).send("Webhook sukses diterima!");
});

// ==========================================
// ENDPOINT: DIAMBIL OLEH ROBLOX STUDIO
// ==========================================
app.get("/donations", (req, res) => {
  res.json({ latestDonation: latestDonation });
});

// WAJIB UNTUK VERCEL
module.exports = app;
