'use client';

import React, { useEffect, useState } from "react";
import { RetrieveData } from "../utils/api";
import { Checkbox } from "@mui/material";
import { useRouter } from "next/navigation";

interface Employee {
    id: number;
    name: string;
    department: string;
    role: string;
    email: string;
    phoneNo: string;
    salary: number;
    year_of_experience: number;
}

interface TableProps {
    data: Employee[];
    pageIndex: number;
    fetch: boolean;
    onSelect: (selectedIds: number[]) => void;
    sendEmployees: (employees: Employee[]) => void;
}

export default function Table({data, pageIndex, reload, onSelect, sendEmployees}: TableProps) {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [message, setMessage] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(pageIndex);
    const [employeesPerPage, setEmployeesPerPage] = useState(10);

    const router = useRouter();
    const lastIndex = currentPage * employeesPerPage;
    const firstIndex = lastIndex - employeesPerPage;

    // Notify parent component of changes in selection
    useEffect(() => {
        onSelect(selectedIds);
    }, [selectedIds, onSelect]);

    useEffect(() => {
        setEmployees(data);
    }, [data]);

    useEffect(() => {
        setCurrentPage(pageIndex);
    }, [pageIndex])

    const fetchData = async () => {
        const response = await RetrieveData();
        if(response) {
            setEmployees(response);
            sendEmployees(response);
        } else {
            setMessage("Failed to fetch employees");
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if(reload) {
            fetchData();
        }
    }, [reload]);

    interface RowData {
        id: string;
        name: string;
        department: string;
        role: string;
        email: string;
        phone: string;
        salary: string;
        experience: string;
    }

    const updateDetails = (employee: Employee) => {
        const query = new URLSearchParams({
            id: employee.id.toString(),
            name: employee.name,
            department: employee.department,
            role: employee.role,
            email: employee.email,
            phone: employee.phoneNo,
            salary: employee.salary.toString(),
            experience: employee.year_of_experience.toString(),
        }).toString();
        router.push(`/employee/employeeCreation?${query}`);
    };

    interface Employee {
        id: number;
        name: string;
        department: string;
        role: string;
        email: string;
        phoneNo: string;
        salary: number;
        year_of_experience: number;
    }

    interface TableProps {
        data: Employee[];
        fetch: () => void;
        onSelect: (selectedIds: number[]) => void;
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, employee: Employee) => {
        if (e.target.checked) {
            setSelectedIds((prev: number[]) => [...prev, employee.id]);
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
                    employees.slice(firstIndex, lastIndex)
                    .map((employee, index) => (
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
                                if ((e.target as HTMLInputElement).type === "checkbox" || (e.target as HTMLElement).closest("td")?.querySelector("input[type='checkbox']"))
                                    return;
                                updateDetails(employee);
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
                        <td colSpan={7} className="text-center">
                            No records available
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            {message && <p className="text-red-500 mt-4">{message}</p>}
        </div>
    );
}
