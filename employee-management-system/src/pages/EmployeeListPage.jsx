import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "../components/TableComponent";
import "../index.css";
import DeleteData from "../api/DeleteData";
import {RetrieveData} from "../api/RetrieveData";
import {Button} from "@mui/material";

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
            // setMessage("No records selected for deletion.");
            return;
        }
        try {
            for (const id of selectedIds) {
                await DeleteData(id);
            }
            // setMessage("Selected records deleted successfully.");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting employee:", error);
            // setMessage("Failed to delete selected records.");
        }
    };

    return (
        <div>
            <div className="w-full flex items-center h-[80px] border-b border-blue-200 border-black">
                <h2 className="text-2xl font-bold ml-[600px] mr-[445px]">Employee List</h2>
                <div>
                    <Button
                        variant="contained"
                        style={{
                            textTransform: "none",
                            marginRight: 15
                        }}
                        onClick={handleNavigate}
                    >
                        Create Employee
                    </Button>

                    <Button
                        variant="contained"
                        type="button"
                        style={{
                            backgroundColor: selectedIds.length > 0 ? "red" : "lightgray",
                            color: "white",
                            cursor: selectedIds.length > 0 ? "pointer" : "not-allowed",
                        }}
                        disabled={(selectedIds.length <= 0)}
                        onClick={deleteData}
                    >
                        Delete
                    </Button>
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
