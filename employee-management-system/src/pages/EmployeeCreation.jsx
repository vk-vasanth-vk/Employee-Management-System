import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InsertData from "../api/InsertData";
import UpdateData from "../api/UpdateData";
import "../index.css";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Button} from "@mui/material";
import {Toaster, toast} from 'sonner';

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
            setRole(employeeData.role || "");
            setEmail(employeeData.email || "");
            setSalary(employeeData.salary || "");
            setPhone(employeeData.phone || "");
            setUpdate(true);
        }
    }, [employeeData]);

    useEffect(() => {
        if(message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !role || !phone || !dept || !salary) {
            setMessage("All fields are required");
            return;
        }

        if( /\d/.test(name) ) {
            setMessage("Name shouldn't contain any numbers!");
               return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email)) {
            setMessage("Enter a valid email address!");
            return;
        }

        const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/;

        if(!phoneRegex.test(phone)) {
            setMessage("Enter a valid phone number!");
            return;
        }

        if(/^\d*$/.test(phone) && phone.length < 10) {
            setMessage("Phone number should have 10 digits!");
            return;
        }

        if(salary < 0) {
            setMessage("Enter a valid salary");
            return;
        }

        try {
            const response = await InsertData(name, dept, role, email, salary, phone);
            setName("");
            setEmail("");
            setRole("");
            setPhone("");
            setDept("");
            setSalary("");
            navigate("/employee-list");
        } catch (error) {
            console.error("Error adding employee:", error);
            setMessage("Failed to add employee");
        }
    };

    const cancelDetails = ()  =>{
        setName("");
        setEmail("");
        setDept("");
        setSalary("");
        setRole("");
        setSalary("");
        setPhone("");

        navigate("/employee-list");
    }

    const updateDetails = async (e) => {
        e.preventDefault();
        if (!name || !email || !role || !phone || !dept || !salary) {
            setMessage("All fields are required");
            return;
        }

        if( /\d/.test(name) ) {
            setMessage("Name shouldn't contain any numbers!");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email)) {
            setMessage("Enter a valid email address!");
            return;
        }

        const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/;

        if(!phoneRegex.test(phone)) {
            setMessage("Enter a valid phone number!");
            return;
        }

        if(phone.length < 10) {
            setMessage("Phone number should have 10 digits!");
            return;
        }

        if(salary < 0) {
            setMessage("Enter a valid salary");
            return;
        }

        try {
            const response = await UpdateData(id, name, dept, role, email, salary, phone);
            navigate("/employee-list");
        } catch (error) {
            console.error("Error updating employee:", error);
            setMessage("Failed to update employee");
        }
    };
    return(
        <div>
            <div className="w-full h-[80px] border-b">
            </div>
            <div className="mt-4">
                    <div className="w-full h-10 flex justify-center text-red-500 text-[20px]"> {message} </div>
                    <h1 className="text-2xl font-bold ml-[350px]">Employee Details</h1>
                <div>
                    <form onSubmit={update ? updateDetails : handleSubmit} className="flex items-center">
                        <div className="flex flex-col space-y-[37px] ml-[350px] mt-[45px] min-w-[200px] h-[350px]">
                            <label htmlFor="name">Name</label>
                            <label htmlFor="department">Department</label>
                            <label htmlFor="role">Designation</label>
                            <label htmlFor="email">Email ID</label>
                            <label htmlFor="phone">Phone No</label>
                            <label htmlFor="salary">Salary</label>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border border-gray-400 p-2 ml-4 w-[400px]"
                            />
                            <input
                                type="text"
                                placeholder="Enter Department"
                                value={dept}
                                onChange={(e) => setDept(e.target.value)}
                                className="border border-gray-400 p-2 ml-4 w-[400px]"
                            />
                            <input
                                type="text"
                                placeholder="Enter Role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="border border-gray-400 p-2 ml-4 w-[400px]"
                            />
                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-400 p-2 ml-4 w-[400px]"
                            />
                            <input
                                type="text"
                                placeholder="Enter Phone no"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="border border-gray-400 p-2 ml-4 w-[400px]"
                            />
                            <input
                                type="number"
                                placeholder="Enter Salary"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                className="border border-gray-400 p-2 ml-4 w-[400px]"
                            />
                        </div>
                        <div className="relative">
                            <Button
                                type="submit" className="absolute top-[250px] left-[-370px]" variant="contained"
                                style={{
                                    textTransform: "none"
                                }}
                            > {update ? "Save" : "Create"}
                            </Button>

                            <Button
                                onClick={cancelDetails}
                                type="button" className="absolute top-[250px] left-[-320px]" variant="outlined"
                                style={{
                                    textTransform: "none"
                                }}
                            >Cancel</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default EmployeeCreation;
