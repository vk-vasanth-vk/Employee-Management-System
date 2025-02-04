import React, { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import { RetrieveData } from "../api/RetrieveData";
import {useNavigate} from "react-router-dom";

const TableComponent = ({ data, fetch, onSelect }) => {
    const [employees, setEmployees] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);
    const navigate = useNavigate();

    // Notify parent component of changes in selection
    useEffect(() => {
        onSelect(selectedIds);
    }, [selectedIds, onSelect]);

    useEffect(() => {
        setEmployees(data);
    }, [data]);

    const fetchData = async () => {
        await RetrieveData(setEmployees);
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if(fetch) {
            fetchData();
        }
    }, [fetch]);

    const updateDetails = (event) => {
        const rowData = { ...event.currentTarget.dataset };
        navigate("/create-employee", { state: rowData }); // Pass rowData to the EmployeeCreation page for update
    };

    const handleCheckboxChange = (e, employee) => {
        if (e.target.checked) {
            setSelectedIds((prev) => [...prev, employee.id]);
        } else {
            setSelectedIds((prev) => prev.filter((id) => id !== employee.id));
        }
    };

    return (
        <div className="text-black w-full h-[400px]">
            <table className="border-collapse border border-gray-400 w-full text-left">
                <thead>
                <tr className="bg-gray-300">
                    <th></th>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Department</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone No</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Experience</th>
                </tr>
                </thead>
                <tbody>
                {employees.length > 0 ? (
                    employees.map((employee, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-200 border-b border-gray-300 cursor-pointer hover:shadow-lg shadow-black"
                            data-key={index}
                            data-id={employee.id}
                            data-name={employee.name}
                            data-department={employee.department}
                            data-role={employee.role}
                            data-email={employee.email}
                            data-salary={employee.salary}
                            data-phone={employee.phoneNo}
                            data-experience={employee.year_of_experience}
                            onClick={(e) => {
                                if (e.target.type === "checkbox" || e.target.closest("td").querySelector("input[type='checkbox']"))
                                    return;
                                updateDetails(e);
                            }}
                        >
                            <td className="border-none">
                                <Checkbox
                                    onChange={(e) => handleCheckboxChange(e, employee)}
                                />
                            </td>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                            <td>{employee.role}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phoneNo}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.year_of_experience}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center">
                            No records available
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            {message && <p className="text-red-500 mt-4">{message}</p>}
        </div>
    );
};

export default TableComponent;
