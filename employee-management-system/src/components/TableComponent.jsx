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
    }, []);

    const updateDetails = (event) => {
        const rowData = { ...event.currentTarget.dataset };
        navigate("/create-employee", { state: rowData }); // Pass rowData to the next page
    };

    return (
        <div className="text-black p-5">
            <table className="border-collapse border border-gray-400 w-full text-left">
                <thead>
                <tr className="bg-gray-200">
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Department</th>
                    <th scope="col">Email</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Phone No</th>
                </tr>
                </thead>
                <tbody>
                {employees.length > 0 ? (
                    employees.map((employee, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-100 cursor-pointer hover:shadow-lg shadow-black"
                            data-key={index}
                            data-id={employee.id}
                            data-name={employee.name}
                            data-department={employee.department}
                            data-email={employee.email}
                            data-salary={employee.salary}
                            data-phone={employee.phoneNo}
                            onClick={updateDetails} // Pass event to the handler
                        >
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                            <td>{employee.email}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.phoneNo}</td>
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
