const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const app = express();


app.use(cors());

app.use(express.json());


const openai = new OpenAI({
  apiKey: "sk-NmqIHB-OmJJgIXmAf7iSQW2V8HuoueKBrfzhn3lFB7T3BlbkFJ8dVan8S3AAsrYk446_ML912PXYz-9-RZnXuwIYQ8kA", // Remplace par ta clé API sécurisée
  organization: "org-LaB7qbOjP1KiSkTSxDErLqTh", 
});

app.post("/api/analyzeMessage", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Voici un message : "${message}". Identifie tous les mots offensants dans ce message et propose une version plus polie de ce message.`,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const improvedMessage = response.choices[0].message.content.trim();

    res.status(200).json({
      improvedMessage: improvedMessage,
      rawMessage: message,
    });
  } catch (error) {
    console.error("Error with OpenAI API:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error with OpenAI API" });
  }
});

// Démarrer le serveur local sur le port 3001
app.listen(3001, () => {
  console.log("Backend running on port 3001");
});
