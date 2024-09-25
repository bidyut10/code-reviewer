import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import GitHubHome from "./pages/GitHubHome";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<GitHubHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
