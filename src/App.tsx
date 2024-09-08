import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Typography } from "@mui/material";

// Pages
import DesignSystem from "./components/DesignSystem";
import Login from "./features/Login";
import Dashboard from "./components/pages/Dashboard/index";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/styles" element={<DesignSystem />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
