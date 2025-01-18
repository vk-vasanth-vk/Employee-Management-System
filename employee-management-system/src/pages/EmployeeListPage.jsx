import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { RetrieveData } from "../api/RetrieveData"; // Import the shared function
import TableComponent from "../components/TableComponent";
import "../index.css";

const EmployeeListPage = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [message, setMessage] = useState("");

    const handleNavigate = () => {
        navigate("/create-employee");
    };

    useEffect(() => {
        RetrieveData(setEmployees, setMessage);
    }, []);

    return (
        <div>
            <div className="w-full flex items-center justify-center space-x-[50px] h-[60px]">
                <button onClick={handleNavigate}>Create Employee</button>
            </div>

            <div className="w-full h-[1px] border border-blue-400 mt-5"></div>

            {message && <p>{message}</p>}

            <div className="mt-10 h-[500px] flex flex-col items-center">
                <h2 className="text-2xl mb-5">Employee List</h2>
                <TableComponent />
            </div>
        </div>
    );
};

export default EmployeeListPage;
