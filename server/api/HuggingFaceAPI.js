export default class HuggingFaceAPI {
  async query(token, prompt) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({"inputs": prompt}),
      }
    );
    const result = await response.blob();
    return result;
  }
}