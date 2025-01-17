import React, { useState } from "react";
import axios from "axios";
import "../index.css";

const EmployeeCreation = () => {
    const [name, setName] = useState("");
    const [dept, setDept] = useState("");
    const [email, setEmail] = useState(""); // Added email state
    const [salary, setSalary] = useState("");
    const [phone, setPhone] = useState(""); // Added phoneNo state
    const [employees, setEmployees] = useState([]);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !dept || !salary) {
            setMessage("All fields are required");
            return;
        }
        try {
            // Sending all data to the backend
            const response = await axios.post("http://localhost:8080/insertRecord", { name, dept, email, salary, phone });
            setMessage(response.data); // Display success message from the backend
            setName(""); // Clear the input fields
            setEmail("");
            setPhone("");
            setDept("");
            setSalary("");
        } catch (error) {
            console.error("Error adding employee:", error);
            setMessage("Failed to add employee");
        }
    };

    return (
        <div className="w-full h-[680px] flex items-center justify-center">
        <div className="w-[550px] h-[600px] border border-black rounded-2xl flex justify-center items-center">
            {/* Employee Form */}

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Corrected handler for name
                    /> <br/>
                    <input
                        type="text"
                        placeholder="Enter Department"
                        value={dept}
                        onChange={(e) => setDept(e.target.value)} // Corrected handler for dept
                    /> <br/>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Corrected handler for email
                    /> <br/>
                    <input
                        type="number"
                        placeholder="Enter salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)} // Corrected handler for salary
                    /> <br/>
                    <input
                        type="number"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)} // Corrected handler for phone number
                    /> <br/>
                </div>
                <button type="submit" className="mt-10 ml-[26px]">Add Employee</button>
            </form>

            {message && <p>{message}</p>} {/* Display any messages from the backend */}
        </div>
        </div>
    );
};

export default EmployeeCreation;
