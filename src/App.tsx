import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import DesignSystem from "./components/DesignSystem";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/styles" element={<DesignSystem />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
