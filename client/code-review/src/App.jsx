import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import GitHubHome from "./pages/GitHubHome";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/HeroSection";

const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<GitHubHome />} />
          <Route path="/hero" element={<HeroSection />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
