import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "../index.css";

const EmployeeListPage = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [message, setMessage] = useState("");

    const handleNavigate = () => {
        navigate("/create-employee");
    }

    const retrieveEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getEmployees");
            setEmployees(response.data);
        } catch (error) {
            console.log("Error fetching employees:", error);
            setMessage("Failed to fetch employees");
        }
    };

    return (
        <div>
            {/* Button to retrieve employees */}
            <div className="w-full flex items-center justify-center space-x-[50px] h-[60px]">
                <button onClick={retrieveEmployees}>Show Employees</button>
                <button onClick={handleNavigate}>Create Employee</button>
            </div>

            <div className="w-full h-[1px] border border-blue-400 mt-5"></div>

            {/* Message display */}
            {message && <p>{message}</p>}

            {/* Employee List */}
            <div className="mt-10 h-[500px] flex flex-col items-center">
                <h2 className="text-2xl mb-5">Employee List</h2>
                <ul>
                    {employees.length > 0 ? (
                        employees.map((employee, index) => (
                            <li key={index}>
                                Name: {employee.name}, Department: {employee.dept}, Email: {employee.email},
                                Salary: {employee.salary}, Phone: {employee.phone}
                            </li>
                        ))
                    ) : (
                        <p>No records found!</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default EmployeeListPage;
