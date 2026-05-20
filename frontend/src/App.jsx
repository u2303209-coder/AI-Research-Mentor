
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ProjectGenerator from "./pages/ProjectGenerator";
import PdfQA from "./pages/PdfQA";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<ProjectGenerator />} />
      
        <Route path="/pdfqa" element={<PdfQA />} />
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
