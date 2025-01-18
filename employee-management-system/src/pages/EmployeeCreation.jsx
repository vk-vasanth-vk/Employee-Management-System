import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InsertData from "../api/InsertData";
import UpdateData from "../api/UpdateData";
import DeleteData from "../api/DeleteData";
import "../index.css";

const EmployeeCreation = () => {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [dept, setDept] = useState("");
    const [email, setEmail] = useState("");
    const [salary, setSalary] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [update, setUpdate] = useState(false);

    const employeeData = location.state;

    // Populate form fields with data from location.state
    useEffect(() => {
        if (employeeData) {
            setId(employeeData.id);
            setName(employeeData.name || "");
            setDept(employeeData.department || "");
            setEmail(employeeData.email || "");
            setSalary(employeeData.salary || "");
            setPhone(employeeData.phone || "");
            setUpdate(true);
        }
    }, [employeeData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !dept || !salary) {
            setMessage("All fields are required");
            return;
        }

        try {
            const response = await InsertData(name, dept, email, salary, phone);
            setMessage(response.data.message || "Employee added successfully");
            setName("");
            setEmail("");
            setPhone("");
            setDept("");
            setSalary("");
            navigate("/employee-list");
        } catch (error) {
            console.error("Error adding employee:", error);
            setMessage("Failed to add employee");
        }
    };

    const updateDetails = async (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !dept || !salary) {
            setMessage("All fields are required");
            return;
        }

        try {
            const response = await UpdateData(id, name, dept, email, salary, phone);
            setMessage(response.data.message || "Employee updated successfully");
            navigate("/employee-list");
        } catch (error) {
            console.error("Error updating employee:", error);
            setMessage("Failed to update employee");
        }
    };

    const deleteData = async () => {
        try {
            const response = await DeleteData(id);
            navigate("/employee-list");
        } catch (error) {
            console.error("Error deleting employee:", error);
            setMessage("Failed to delete record");
        }
    };

    return (
        <div className="w-full h-[680px] flex items-center justify-center">
            <div className="w-[550px] h-[600px] border border-black rounded-2xl flex justify-center items-center">
                <form onSubmit={update ? updateDetails : handleSubmit}>
                    {[{ label: "Enter name", value: name, onChange: setName, type: "text" },
                        { label: "Enter Department", value: dept, onChange: setDept, type: "text" },
                        { label: "Enter email", value: email, onChange: setEmail, type: "email" },
                        { label: "Enter salary", value: salary, onChange: setSalary, type: "number" },
                        { label: "Enter phone number", value: phone, onChange: setPhone, type: "number" },
                    ].map((field, index) => (
                        <div key={index} className="mb-4">
                            <input
                                type={field.type}
                                placeholder={field.label}
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="border p-2 w-full"
                            />
                        </div>
                    ))}
                    <div className="h-[80px] w-full flex items-center">
                        <button type="submit" className="p-2 bg-blue-500 text-white rounded mr-4">
                            {update ? "Update Details" : "Add Employee"}
                        </button>
                        {update && (
                            <button
                                type="button"
                                onClick={deleteData}
                                className="p-2 bg-red-500 text-white rounded"
                            >
                                Delete Record
                            </button>
                        )}
                    </div>
                </form>
                {message && <p className="mt-4 text-red-500">{message}</p>}
            </div>
        </div>
    );
};

export default EmployeeCreation;
