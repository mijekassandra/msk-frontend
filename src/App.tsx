import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Typography } from "@mui/material";

// Pages
import DesignSystem from "./components/DesignSystem";
import BodyContainer from "./components/containers/BodyContainer";
import DashboardCard from "./components/cards/DashboardCard";
import Login from "./Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/styles" element={<DesignSystem />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
