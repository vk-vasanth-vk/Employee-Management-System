import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InsertData from "../api/InsertData";
import UpdateData from "../api/UpdateData";
import "../index.css";

const EmployeeCreation = () => {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [dept, setDept] = useState("");
    const [role, setRole] = useState("");
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

    return (
        <div>
            <div className="border border-black w-full h-[80px] flex items-center justify-center">
                <h1 className="text-2xl font-bold">Employee Details</h1>
            </div>
            <div className="w-full h-[550px] flex justify-center mt-12">
                <div className="w-[710px] h-[55 0px] border border-black rounded-2xl">
                    <form onSubmit={update ? updateDetails : handleSubmit}>
                        {[{ label: "Name", value: name, onChange: setName, type: "text" },
                            { label: "Department", value: dept, onChange: setDept, type: "text" },
                            { label: "Role", value: role, onChange: setRole, type: "text" },
                            { label: "Email", value: email, onChange: setEmail, type: "email" },
                            { label: "Phone no", value: phone, onChange: setPhone, type: "number" },
                            { label: "Salary", value: salary, onChange: setSalary, type: "number" },
                        ].map((field, index) => (
                            <div key={index} className="mb-3 flex items-center">
                                <div className="ml-[200px]">
                                    <label htmlFor={field}>{field.label}</label>
                                </div>
                                <div className="">
                                    <input
                                        type={field.type}
                                        placeholder={`Enter ${field.label}`}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        className="border border-gray-400 p-2 ml-4 w-[260px]"
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="h-[80px] w-full flex items-center ml-[280px]">
                            <button type="submit" className="p-2 bg-blue-500 text-white rounded mr-4">
                                {update ? "Update Details" : "Add Employee"}
                            </button>

                        </div>
                    </form>
                    {message && <p className="mt-4 text-red-500">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default EmployeeCreation;
