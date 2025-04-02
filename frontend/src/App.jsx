import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from "./Upload";
import PeopleList from "./PeopleList";

function App() {
  return (
    <Router>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">CSV Uploader</h1>
        <nav className="mb-6 space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Upload</Link>
          <Link to="/people" className="text-blue-600 hover:underline">View People</Link>
          <a href="http://localhost:8000/export/" className="text-blue-600 hover:underline">Download CSV</a>
        </nav>
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/people" element={<PeopleList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
