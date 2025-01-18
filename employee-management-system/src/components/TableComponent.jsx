import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RetrieveData } from "../api/RetrieveData";

const TableComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            await RetrieveData(setEmployees, setMessage);
        };
        fetchData();
    }, []); // Empty dependency array ensures this runs only once

    const updateDetails = (event) => {
        const rowData = {...event.currentTarget.dataset};
        navigate("/create-employee", { state: rowData }); // Pass rowData to the next page
    };

    return (
        <div className="text-black p-5">
            <table className="border-collapse border border-gray-400 w-full text-left">
                <thead>
                <tr className="bg-gray-200">
                    <th scope="col" className="border border-gray-400 px-4 py-2">Name</th>
                    <th scope="col" className="border border-gray-400 px-4 py-2">Department</th>
                    <th scope="col" className="border border-gray-400 px-4 py-2">Email</th>
                    <th scope="col" className="border border-gray-400 px-4 py-2">Salary</th>
                    <th scope="col" className="border border-gray-400 px-4 py-2">Phone No</th>
                </tr>
                </thead>
                <tbody>
                {employees.length > 0 ? (
                    employees.map((employee, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-100 cursor-pointer"
                            data-name={employee.name}
                            data-department={employee.department}
                            data-email={employee.email}
                            data-salary={employee.salary}
                            data-phone={employee.phone}
                            onClick={updateDetails} // Pass event to the handler
                        >
                            <td className="border border-gray-400 px-4 py-2">{employee.name}</td>
                            <td className="border border-gray-400 px-4 py-2">{employee.department}</td>
                            <td className="border border-gray-400 px-4 py-2">{employee.email}</td>
                            <td className="border border-gray-400 px-4 py-2">{employee.salary}</td>
                            <td className="border border-gray-400 px-4 py-2">{employee.phoneNo}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan="5"
                            className="border border-gray-400 px-4 py-2 text-center"
                        >
                            No records available
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* Display message if there is an issue */}
            {message && <p className="text-red-500 mt-4">{message}</p>}
        </div>
    );
};

export default TableComponent;
