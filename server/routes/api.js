const HuggingFaceAPI = require('./../api/HuggingFaceAPI');
const express = require('express');
const fs = require('fs');

let displayUpdated = false;

const router = express.Router();
router.use(express.json());

router.post('/generate-image', async (req, res) => {
  const prompt = req.body.prompt;
  const token = process.env.HUGGING_FACE_API_KEY;
  
  console.log('Image generation requested');
  
  try {
    const client = new HuggingFaceAPI();
    
    client.query(token, prompt)
        .then(async (resultImage) => {
          const buffer = Buffer.from( await resultImage.arrayBuffer() );
          
          fs.writeFile('data/last-image.png', buffer, function (err) {
            if (err) return console.log(err);
            console.log('Successfully saved image');
          });
          
          displayUpdated = true
          res.json({result: resultImage});
        });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Failed to generate image'});
  }
});

router.get('/image', (req, res) => {
  const filePath = 'data/last-image.png';
  
  console.log('Image requested');
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).json({error: "Failed to read the image file"});
    }
    
    const base64Image = data.toString("base64");
    res.json({base64: `data:image/png;base64,${base64Image}`});
  });
})

router.get('/image-changed', (req, res) => {
  console.log('Image checked');
  
  res.json({ changed: displayUpdated });
  
  if (displayUpdated)
    displayUpdated = false
})

module.exports = router;