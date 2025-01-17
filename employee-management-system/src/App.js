import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";  // No need to import Router here
import EmployeeListPage from "./pages/EmployeeListPage";
import EmployeeCreation from "./pages/EmployeeCreation";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<EmployeeListPage/>} />
                    <Route path="/employee-list" element={<EmployeeListPage/>} />
                    <Route path="/create-employee" element={<EmployeeCreation/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
