const express = require("express");
const app = express();

// Middleware untuk membaca format JSON dari SociaBuzz
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Variabel penampung donasi terakhir
let latestDonation = null;

app.post("/webhook", (req, res) => {
  const data = req.body;
  console.log("Menerima Webhook:", data);

  latestDonation = {
    id: Date.now().toString(),
    name: data.supporter_name || "Seseorang",
    amount: data.amount || 0,
    message: data.message || "Tidak ada pesan"
  };

  console.log("Data disiapkan untuk Roblox:", latestDonation);
  res.status(200).send("Webhook sukses diterima!");
});

app.get("/donations", (req, res) => {
  res.json({ latestDonation: latestDonation });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Server API menyala di port " + listener.address().port);
});
