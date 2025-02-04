import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "../components/TableComponent";
import "../index.css";
import DeleteData from "../api/DeleteData";
import { Button } from "@mui/material";
import FilterData from "../api/FilterData";
import SearchData from "../api/SearchData";
import axios from "axios";

const EmployeeListPage = () => {
    const navigate = useNavigate();
    const [selectedIds, setSelectedIds] = useState([]);
    const [message, setMessage] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false); // State to control dropdown visibility
    const [deptDropdown, setDeptDropdown] = useState(false);
    const [roleDropdown, setRoleDropdown] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [filteredDept, setFilteredDept] = useState("");
    const [filteredRole, setFilteredRole] = useState("");
    const [triggerFetch, setTriggerFetch] = useState(false);

    const roleList = [
        {dept:"Design", role:"Graphic Designer"},
        {dept:"Design", role:"UI/UX Designer"},
        {dept:"Development", role:"Web Developer"},
        {dept:"Development", role:"DevOps Engineer"},
        {dept:"Testing", role:"Quality Analyst"},
        {dept:"Human Resource", role:"HR Recruiter"},
    ]

    const handleNavigate = () => {
        navigate("/create-employee");
    };

    useEffect(() => {
        if(message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    const triggerFetchFunction = () => {
        setTriggerFetch(true);
        setTimeout(() => setTriggerFetch(false), 0);
    }

    const deleteData = async () => {
        if (selectedIds.length === 0) return;
        try {
            await DeleteData(selectedIds);
            triggerFetchFunction()
            setMessage("Data deleted successfully!");
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

    const filterEmployee = async () => {
        try {
            const response = await FilterData(filteredDept, filteredRole);
            setFilteredData(response);
        } catch (e) {
            console.error(e);
        }
    }

    async function searchEmployee() {
        try {
            if(!inputValue.trim()) {
                setMessage("Enter the name!")
                return;
            }
            const response = await SearchData(inputValue,filteredDept);
            setFilteredData(response);

        } catch(e) {
            console.error(e);
        }
    }

        const [file,setFile] = useState(null);

        const handleFileChange = (e) => {
            setFile(e.target.files[0]);
        };

        const handleUpload = async () => {
            if(!file) {
                alert("Upload a file!");
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axios.put("http://localhost:8080/uploadFile", formData, {
                    headers: {"Content-Type" : "multipart/form-data"},
                });
                alert(response.data.message);
            } catch(error) {
                console.error(error);
            }
        }


    return (
        <>
            <div className="bg-gray-100 min-h-screen p-6">
                {dropdownVisible &&
                    <div className="absolute top-0 right-0 z-10 w-[400px] h-[695px] bg-white border-l border-gray-400">
                        <div className="shadow-md w-full h-[50px] flex items-center">
                            <img src="/close.png" alt="" className="w-8 h-8 ml-4 cursor-pointer" onClick={toggleDropdown}/>
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: (filteredDept === "" && filteredRole === "") ? "lightgray" : "blueviolet",
                                    color: "white",
                                    cursor: (filteredDept === "" && filteredRole === "") ? "not-allowed" : "pointer",
                                    width: "80px",
                                    height: "40px",
                                    marginLeft: "160px",
                                    textTransform: "none"
                                }}
                                disabled={filteredDept === "" && filteredRole === ""}
                                onClick={() => {
                                    filterEmployee()
                                    setDropdownVisible(false)
                                }}
                            >
                                Apply
                            </Button>
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: (filteredDept === "" && filteredRole === "") ? "lightgray" : "red",
                                    color: "white",
                                    cursor: (filteredDept === "" && filteredRole === "") ? "not-allowed" : "pointer",
                                    width: "80px",
                                    height: "40px",
                                    marginLeft: "20px",
                                    textTransform: "none"
                                }}
                                disabled={filteredDept === "" && filteredRole === ""}
                                onClick={() => {
                                    setFilteredDept("");
                                    setFilteredRole("");
                                    toggleDeptDropdown(false);
                                    toggleRoleDropdown(false);
                                }}
                            >
                                Clear
                            </Button>
                        </div>
                        <div className={`w-full ${deptDropdown ? "h-[280px]" : "h-[70px]"}`}>
                            <div
                                className="h-[70px] w-full border flex items-center pl-5 hover:shadow-md hover:bg-gray-200 bg-gray-100 font-medium text-[17px]"
                                onClick={toggleDeptDropdown}>
                                Department
                                <img src="/down-arrow.png" alt="" className="w-5 h-5 ml-2 mt-1"/>
                            </div>
                            <ul className={`h-[195px] w-full border ${deptDropdown ? "block" : "hidden"}`}>
                                <li className={`h-1/4 w-full border ${(filteredDept === "Design") ? "bg-gray-400" : "white"}`}
                                    onClick={(event) => {
                                        setFilteredDept(event.target.textContent)
                                    }}
                                >Design
                                </li>
                                <li className={`h-1/4 w-full border ${(filteredDept === "Development") ? "bg-gray-400" : "white"}`}
                                    onClick={(event) => setFilteredDept(event.target.textContent)}
                                >Development
                                </li>
                                <li className={`h-1/4 w-full border ${(filteredDept === "Testing") ? "bg-gray-400" : "white"}`}
                                    onClick={(event) => setFilteredDept(event.target.textContent)}
                                >Testing
                                </li>
                                <li className={`h-1/4 w-full border ${(filteredDept === "Human Resource") ? "bg-gray-400" : "white"}`}
                                    onClick={(event) => setFilteredDept(event.target.textContent)}
                                >Human Resource
                                </li>
                            </ul>
                        </div>
                        <div className={`w-full ${roleDropdown ? "h-[280px]" : "h-[70px]"}`}>
                            <div
                                className="h-[70px] w-full border flex items-center pl-5 hover:shadow-md hover:bg-gray-200 bg-gray-100 font-medium text-[17px]"
                                onClick={toggleRoleDropdown}>
                                Designation
                                <img src="/down-arrow.png" className="w-5 h-5 ml-2 mt-1"/>
                            </div>

                            <ul className={`h-[195px] w-full border ${roleDropdown ? "block" : "hidden"}`}>

                                {filteredDept !== "" ? (
                                    roleList
                                        .filter((Role) => Role.dept === filteredDept) // Filter roles by department
                                        .map((Role, index) => (
                                            <li
                                                key={index}
                                                className={`h-1/4 w-full border ${
                                                    filteredRole === Role.role ? "bg-gray-400" : "bg-white"
                                                }`}
                                                onClick={() => {
                                                    setFilteredRole(Role.role)
                                                }}
                                            >
                                                {Role.role}
                                            </li>
                                        ))
                                ) : (
                                    roleList.map((Role, index) => (
                                        <li
                                            key={index}
                                            className={`h-1/4 w-full border ${
                                                filteredRole === Role.role ? "bg-gray-400" : "bg-white"
                                            }`}
                                            onClick={() => setFilteredRole(Role.role)}
                                        >
                                            {Role.role}
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                }
                {/* Header */}
                <div className="w-full flex items-center h-16 border-b border-gray-300 mb-2">
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
                            New Employee
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
                <div className="rounded-md p-4 mb-2">
                    <div className="max-w-2xl mx-auto flex items-center relative">
                        {/* Dropdown */}
                        <button
                            id="dropdown-button"
                            className="flex w-[90px] h-10 items-center py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-300"
                            type="button"
                            onClick={toggleDropdown}
                        >
                            Filter
                            <img src="/filter.png" className="w-4 h-4 ml-2"/>
                        </button>

                        {/* Search Input */}
                        <input
                            type="search"
                            onChange={(event) => {
                                setInputValue(event.target.value)
                            }}
                            id="search-dropdown"
                            className="ml-2 flex-1 p-2 pl-5 mt-0 text-md text-gray-900 bg-gray-50 border border-gray-300 rounded-l-xl rounded-r-none h-10 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search name..."
                            required
                        />
                        <button
                            onClick={searchEmployee}
                            type="click"
                            className="flex items-center justify-center w-10 h-10 text-sm font-medium border border-blue-500 text-white bg-blue-600 rounded-r-xl rounded-l-none hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
                        >
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </button>
                    </div>
                    <input type="file" className="ml-[500px] mr-5 w-50"
                        onChange={handleFileChange}
                    />
                    <button
                        onClick={handleUpload}
                    >Upload</button>
                </div>

                <div className="flex items-center text-red-500 mb-6"
                     onClick={() => {
                         triggerFetchFunction()
                     }}
                >
                    <p className="text-red-500 text-center ml-[700px]">{message}</p>
                    <div className="ml-[1390px] fixed">
                        <button className="border-none h-6 w-[100px] bg-gray-100 flex items-center">
                            <h2 className="text-red-500"> Clear Filter </h2>
                            <img src="/close-red.png" className="ml-2 w-3 h-3"/>
                        </button>
                    </div>
                </div>
                {/**/}
                {/* Table */}
                <div className="mt-3">
                    <TableComponent
                        data={filteredData}
                        fetch={triggerFetch}
                        onSelect={(selectedIds) => setSelectedIds(selectedIds)}
                    />
                </div>
            </div>
        </>
    );
};

export default EmployeeListPage;
