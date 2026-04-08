// Update untuk memancing Vercel
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Variabel penampung donasi terakhir
let latestDonation = null;

// Endpoint Webhook untuk SociaBuzz
app.post("/webhook", (req, res) => {
  const data = req.body;
  console.log("Menerima Webhook:", data);

  latestDonation = {
    id: Date.now().toString(),
    name: data.supporter_name || "Seseorang",
    amount: data.amount || 0,
    message: data.message || "Tidak ada pesan"
  };

  res.status(200).send("Webhook sukses diterima!");
});

// Endpoint untuk ditarik oleh Roblox
app.get("/donations", (req, res) => {
  res.json({ latestDonation: latestDonation });
});
// ==========================================
// ENDPOINT 3: JALUR TES RAHASIA VIA BROWSER
// ==========================================
app.get("/tes-donasi", (req, res) => {
  // Kita buat data donasi bohongan sebesar Rp 50.000 agar Cinematic-nya nyala
  latestDonation = {
    id: Date.now().toString(),
    name: "VYBExAlphaa",
    amount: 50000, 
    message: "Halo CUBE CLUB! Ini tes efek layarnya!"
  };
  
  res.send("<h1>✅ Sinyal donasi Rp 50.000 sukses ditembakkan!</h1><p>Sekarang cepat buka layar Roblox Studio kamu, dalam 10 detik efeknya akan muncul!</p>");
});
// WAJIB UNTUK VERCEL: Export app-nya (bukan app.listen)
module.exports = app;
