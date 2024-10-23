import React, { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/generate-image",
        { prompt }
      );
      console.log(response);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Image Generator</h1>
      <input
        type="text"
        placeholder="Enter a prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "300px", padding: "10px" }}
      />
      <button
        onClick={handleGenerateImage}
        disabled={loading}
        style={{ marginLeft: "10px", padding: "10px" }}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <h2>Generated Image</h2>
          <img
            src={imageUrl}
            alt="Generated"
            style={{ width: "1024px", height: "1024px" }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
