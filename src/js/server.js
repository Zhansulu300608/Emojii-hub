import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 5050;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend работает!");
});

app.get("/api/emojis", async (req, res) => {
  try {
    const response = await axios.get("https://emojihub.yurace.pro/api/all");
    res.json(response.data);
  } catch (error) {
    console.error("Ошибка при запросе:", error.message);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
