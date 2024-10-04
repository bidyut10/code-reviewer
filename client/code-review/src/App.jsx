import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import GitHubHome from "./pages/GitHubHome";
import CodeReviewResponse from "./pages/CodeReviewResponse";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<GitHubHome />} />
          <Route path="/response" element={<CodeReviewResponse />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
