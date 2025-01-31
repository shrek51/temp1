import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ShiftPage from "./ShiftPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team/:teamId" element={<ShiftPage />} />
      </Routes>
    </Router>
  );
}

export default App;
