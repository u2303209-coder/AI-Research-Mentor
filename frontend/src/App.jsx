import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import PdfQA from "./pages/PdfQA";
import ProjectGenerator from "./pages/ProjectGenerator";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/chatbot"  element={<Chatbot />} />
        <Route path="/pdfqa"    element={<PdfQA />} />
        <Route path="/projects" element={<ProjectGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
