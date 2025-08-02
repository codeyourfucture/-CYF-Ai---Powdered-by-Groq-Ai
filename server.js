import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// ဒီမှာ API key ကို တိုက်ရိုက်ထည့်ထားတယ် (အန္တရာယ်ရှိတာ သတိထားပါ)
const GROQ_API_KEY = "Bearer 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";

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": GROQ_API_KEY
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant like ChatGPT. Always use markdown format for code, and answer clearly and step-by-step."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
