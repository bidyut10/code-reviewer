import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import GitHubHome from "./pages/GitHubHome";
import CodeReviewResponse from "./pages/CodeReviewResponse";
import HomeNew from "./pages/HomeNew";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeNew />} />
          <Route path="/home" element={<GitHubHome />} />
          <Route path="/response" element={<CodeReviewResponse />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
