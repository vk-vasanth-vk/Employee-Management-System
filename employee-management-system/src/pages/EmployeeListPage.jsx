import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "../components/TableComponent";
import "../index.css";
import DeleteData from "../api/DeleteData";
import {RetrieveData} from "../api/RetrieveData";

const EmployeeListPage = () => {
    const navigate = useNavigate();
    const [selectedIds, setSelectedIds] = useState([]);
    const [message, setMessage] = useState("");
    const [employees, setEmployees] = ([]);

    const handleNavigate = () => {
        navigate("/create-employee");
    };

    const deleteData = async () => {
        if (selectedIds.length === 0) {
            setMessage("No records selected for deletion.");
            return;
        }

        try {
            for (const id of selectedIds) {
                await DeleteData(id);
            }
            // setMessage("Selected records deleted successfully.");
            const response = RetrieveData(setEmployees);

        } catch (error) {
            console.error("Error deleting employee:", error);
            // setMessage("Failed to delete selected records.");
        }
    };

    return (
        <div>
            <div className="w-full flex items-center h-[80px] border-b border-black">
                <h2 className="text-2xl font-bold ml-[700px] mr-[330px]">Employee List</h2>
                <div>
                    <button className="mr-5" onClick={handleNavigate}>
                        Create Employee
                    </button>
                    <button
                        type="button"
                        onClick={deleteData}
                        className={`p-2 text-white rounded ${
                            selectedIds.length <= 0 ? "bg-gray-500 cursor-not-allowed" : "bg-red-500"
                        }`}
                        disabled={(selectedIds.length <= 0)}
                    >
                        Delete Record
                    </button>
                </div>
            </div>

            {message && <p className="text-red-500 mt-4">{message}</p>}

            <div className="mt-10 h-[500px] flex flex-col items-center">
                <TableComponent
                    onSelect={(selectedIds) => setSelectedIds(selectedIds)}
                />
            </div>
        </div>
    );
};

export default EmployeeListPage;
