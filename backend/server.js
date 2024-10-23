const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Endpoint to generate image using OpenAI API
app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);
  try {
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data[0].url;
    res.json({ imageUrl });
  } catch (error) {
    console.log("Error generating image:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

const PORT = 8000; //process.env.PORT ||
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
