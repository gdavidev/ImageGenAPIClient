import { config } from 'dotenv';
import express, { json } from 'express';
import { router as apiRouter } from './routes/generateImage.js'
import path from "path"

const __dirname = path.dirname(new URL(import.meta.url).pathname);

config();
const app = express();

// Middleware to parse JSON
app.use(json());

// Serve static files from the "public" folder (for HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "../client")));

// Serve the HTML page when visiting the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});

app.post('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})