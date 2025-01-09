import { Router } from "express";

export const router = Router();

router.post('/generate-image', async (req, res) => {
  const input = req.body;
  const token = process.env.HUGGING_FACE_API_KEY;

  try {
    const client = new HuggingFaceAPI();
    const imageBlob = client.query(token, input.prompt);

    res.json({ result: imageBlob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});