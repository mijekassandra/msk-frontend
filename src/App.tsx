import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// Pages
import Login from "./features/Login/Login";
import Dashboard from "./components/pages/Dashboard/index";
import ProtectedRoute from "./ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/*"
                    element={<ProtectedRoute element={<Dashboard />} />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
