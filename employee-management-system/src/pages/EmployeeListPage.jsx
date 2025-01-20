import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "../components/TableComponent";
import "../index.css";
import DeleteData from "../api/DeleteData";
import { Button } from "@mui/material";
import FilterData from "../api/FilterData";
import SearchData from "../api/SearchData";
import filterData from "../api/FilterData";

const EmployeeListPage = () => {
    const navigate = useNavigate();
    const [selectedIds, setSelectedIds] = useState([]);
    const [message, setMessage] = useState("");
    const [employees, setEmployees] = ([]);
    const [dropdownVisible, setDropdownVisible] = useState(false); // State to control dropdown visibility
    const [inputValue, setInputValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleNavigate = () => {
        navigate("/create-employee");
    };

    const deleteData = async () => {
        if (selectedIds.length === 0) return;
        try {
            for (const id of selectedIds) {
                await DeleteData(id);
            }
            window.location.reload();
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const toggleDropdown = () => {
        setDropdownVisible((prevState) => !prevState);
    };

    async function getEmployeesByDept(event) {
        try {
            const filterData = await FilterData(event.target.textContent);
            setFilteredData(filterData);
        } catch(e) {
            console.error(e);
        }
    }

    async function searchEmployee() {
        try {
            const response = await SearchData(inputValue);
            setFilteredData(response);

            if(response !== null) {
                response.forEach((item) => {
                    console.log(item);
                })
            }

        } catch(e) {
            console.error(e);
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Header */}
            <div className="w-full flex items-center h-16 border-b border-gray-300 mb-4">
                <h2 className="text-2xl font-bold text-center flex-1 ml-[300px]">Employee List</h2>
                <div className="flex gap-4">
                    <Button
                        variant="contained"
                        onClick={handleNavigate}
                        style={{
                            textTransform: "none",
                            marginRight: "10px",
                        }}
                    >
                        Create Employee
                    </Button>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: selectedIds.length > 0 ? "red" : "lightgray",
                            color: "white",
                            cursor: selectedIds.length > 0 ? "pointer" : "not-allowed",
                        }}
                        disabled={selectedIds.length <= 0}
                        onClick={deleteData}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            {/* Search Form */}
            <div className="rounded-md p-4 mb-6">
                <div className="max-w-2xl mx-auto flex items-center gap-2 relative">
                    {/* Dropdown */}
                    <button
                        id="dropdown-button"
                        className="flex w-[90px] items-center py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-300"
                        type="button"
                        onClick={toggleDropdown}
                    >
                        Filter
                        <svg
                            className="w-[12px] h-[12px] ml-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>
                    {dropdownVisible && (
                        <div
                            id="dropdown"
                            className="absolute z-10 bg-white border rounded-md shadow-md top-full mt-1 left-0 w-44"
                        >
                            <ul className="py-2 text-sm " onClick={toggleDropdown}>
                                <li>
                                    <button
                                        onClick={(event) => getEmployeesByDept(event)}
                                        type="button"
                                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    >
                                        Development
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        onClick={(event) => getEmployeesByDept(event)}
                                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    >
                                        Design
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        onClick={(event) => getEmployeesByDept(event)}
                                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    >
                                        Testing
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        onClick={(event) => getEmployeesByDept(event)}
                                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                    >
                                        Human Resource
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* Search Input */}
                    <input
                        type="search"
                        onChange={(event) => {setInputValue(event.target.value)}}
                        id="search-dropdown"
                        className="flex-1 p-2 mt-0 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-r-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search records..."
                        required
                    />
                    <button
                        onClick={searchEmployee}
                        type="click"
                        className="flex items-center justify-center w-10 text-sm font-medium border border-blue-500 text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
                    >
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Message */}
            {message && <p className="text-red-500 text-center mb-4">{message}</p>}

            {/* Table */}
            <div className="mt-6">
                <TableComponent
                    data={filteredData}
                    onSelect={(selectedIds) => setSelectedIds(selectedIds)}
                />
            </div>
        </div>
    );
};

export default EmployeeListPage;
