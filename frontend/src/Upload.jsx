import React, { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        body: formData,
      });
      const text = await response.text();
      setMessage(text.includes("rows added") ? "✅ Upload successful" : text);
    } catch (err) {
      setMessage("❌ Upload failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
}
