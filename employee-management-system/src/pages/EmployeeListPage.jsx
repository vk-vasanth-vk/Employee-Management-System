import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "../components/TableComponent";
import "../index.css";

const EmployeeListPage = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/create-employee");
    };


    return (
        <div>
            <div className="w-full flex items-center justify-end h-[80px] border-b border-black">
                <h2 className="text-2xl mr-[450px]">Employee List</h2>
                <button className="mr-10" onClick={handleNavigate}>Create Employee</button>
            </div>

            {/*{message && <p>{message}</p>}*/}

            <div className="mt-10 h-[500px] flex flex-col items-center">
                <TableComponent />
            </div>
        </div>
    );
};

export default EmployeeListPage;
