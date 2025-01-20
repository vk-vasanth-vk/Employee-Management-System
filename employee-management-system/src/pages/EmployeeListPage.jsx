import React, {use, useState} from "react";
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
    const [deptDropdown, setDeptDropdown] = useState(false);
    const [roleDropdown, setRoleDropdown] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [filteredDept, setFilteredDept] = useState("");
    const [filteredRole, setFilteredRole] = useState("");

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

    const toggleDeptDropdown = () => {
        setDeptDropdown((prevState) => !prevState);
    };

    const toggleRoleDropdown = () => {
        setRoleDropdown((prevState) => !prevState);
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
            {dropdownVisible &&
                <div className="absolute top-0 right-0 z-10 w-[400px] h-[695px] bg-white border-l border-gray-400">
                    <div className="shadow-md w-full h-[50px] flex items-center">
                        <img src="/cancel-button.png" className="w-8 h-8 ml-4" onClick={toggleDropdown}/>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: 1 > 0 ? "blueviolet" : "lightgray",
                                color: "white",
                                cursor: selectedIds.length > 0 ? "pointer" : "not-allowed",
                                width: "80px",
                                height: "40px",
                                marginLeft: "250px",
                                textTransform: "none"
                            }}
                            disabled={selectedIds.length <= 0}
                            onClick={deleteData}
                        >
                            Apply
                        </Button>
                    </div>
                    <div className={`w-full ${deptDropdown ? "h-[280px]" : "h-[70px]"}`}>
                        <div
                            className="h-[70px] w-full border flex items-center pl-5 hover:shadow-md hover:bg-gray-200 bg-gray-100 font-medium text-[17px]"
                            onClick={toggleDeptDropdown}>
                            Department
                            <img src="/down-arrow.png" className="w-5 h-5 ml-2 mt-1"/>
                        </div>
                        <ul className={`h-[195px] w-full border ${deptDropdown ? "block" : "hidden"}`}>
                            <li className="h-1/4 w-full border"
                                onClick={(event) => getEmployeesByDept(event)}
                            >Design</li>
                            <li className="h-1/4 w-full border"
                                onClick={(event) => getEmployeesByDept(event)}
                            >Development</li>
                            <li className="h-1/4 w-full border"
                                onClick={(event) => getEmployeesByDept(event)}
                            >Testing</li>
                            <li className="h-1/4 w-full border"
                                onClick={(event) => getEmployeesByDept(event)}
                            >Human Resource</li>
                        </ul>
                    </div>
                    <div className={`w-full ${roleDropdown ? "h-[280px]" : "h-[70px]"}`}>
                        <div className="h-[70px] w-full border flex items-center pl-5 hover:shadow-md hover:bg-gray-200 bg-gray-100 font-medium text-[17px]" onClick={toggleRoleDropdown}>
                            Designation
                            <img src="/down-arrow.png" className="w-5 h-5 ml-2 mt-1"/>
                        </div>
                        <ul className={`h-[195px] w-full border ${roleDropdown ? "block" : "hidden"}`}>
                            <li className="h-1/4 w-full border">Graphic Designer</li>
                            <li className="h-1/4 w-full border">UI/UX Designer</li>
                            <li className="h-1/4 w-full border">Web Developer</li>
                            <li className="h-1/4 w-full border">DevOps Engineer</li>
                            <li className="h-1/4 w-full border">Quality Analyst</li>
                            <li className="h-1/4 w-full border">HR Recruiter</li>
                        </ul>
                    </div>
                </div>
            }
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
                        <img src="/filter.png" className="w-4 h-4 ml-2" />
                    </button>

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
