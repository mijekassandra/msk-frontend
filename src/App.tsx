import React, { createContext, useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// Pages
import DesignSystem from "./components/DesignSystem";
import Login from "./features/Login";
import Dashboard from "./components/pages/Dashboard/index";
import ProtectedRoute from "./PrivateRoute";

type UserRoleProps = "SuperAdmin" | "Admin" | "User";

// Define the shape of the UserContext
interface UserContextTypeProps {
    userRole: "SuperAdmin" | "Admin" | "User";
    setUserRole: React.Dispatch<React.SetStateAction<UserRoleProps>>;
}

// Create UserContext
const UserContext = createContext<UserContextTypeProps | undefined>(undefined);

// Hook to use the UserContext
const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};

function App() {
    const [userRole, setUserRole] = useState<UserRoleProps>("User"); // Default role

    return (
        <UserContext.Provider value={{ userRole, setUserRole }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/styles" element={<DesignSystem />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/*" element={<Dashboard />} />
                </Routes>

                {/* <ProtectedRoute
                    path="/dashboard/*"
                    element={Dashboard}
                    allowedRoles={["SuperAdmin", "Admin"]}
                /> */}
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export { useUser }; // Export useUser hook
export default App;
