const express = require('express');
const app = express();
app.use(express.json());
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();
const openai = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openaiClient = new OpenAIApi(configuration);

app.post('/explain-move', async (req, res) => {
  const { fen, move } = req.body;

  try {
    const response = await openaiClient.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful chess coach." },
        {
          role: "user",
          content: `The current chessboard state is: ${fen}. The move is: ${move}. Explain the move for a beginner in plain language.`,
        },
      ],
      temperature: 0.7,
    });

    const explanation = response.data.choices[0].message.content;
    res.json({ move, explanation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate explanation" });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
