import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle File Selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    // Limit file size (10MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrorMessage("File size must be less than 10MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setErrorMessage(""); // Clear previous errors
  };

  // Handle File Upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploading(true);
      const res = await axios.post("http://localhost:5001/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAnalysis(res.data.analysis);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>
        📄 AI Resume Feedback{" "}
        <span role="img" aria-label="document">
          📑
        </span>
      </h1>

      <input type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} />

      {file && (
        <p style={{ marginTop: "10px" }}>
          <strong>Selected File:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </p>
      )}

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <button 
        onClick={handleUpload} 
        disabled={!file || uploading} 
        style={{ marginTop: "10px", padding: "10px", cursor: file ? "pointer" : "not-allowed" }}
      >
        {uploading ? "Uploading..." : "Analyze"}
      </button>

      <div style={{ marginTop: "2rem" }}>
        {analysis.length > 0 && <h2>AI Analysis 🧠</h2>}
        {analysis.map((item, index) => (
          <div key={index} style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
            <p><strong>Original:</strong> {item.original}</p>
            <p><strong>Feedback:</strong> {item.feedback}</p>
            <p><strong>Rewrite:</strong> {item.rewrite}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;