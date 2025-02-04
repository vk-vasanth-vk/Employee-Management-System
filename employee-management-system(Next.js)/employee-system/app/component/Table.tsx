'use client';

import React, { useEffect, useState } from "react";
import { RetrieveData, DownloadFile } from "../utils/api";
import { Button, Checkbox } from "@mui/material";
import { useRouter } from "next/navigation";
import Employee from "@/app/types/Employee";
import TableProps from "@/app/types/TableProps";
import Image from "next/image";
import { useEmployee } from "@/app/context/EmployeeContext";

export default function Table({data, pageIndex, reload, onSelect, sendEmployees}: TableProps) {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(pageIndex);
    const { setSelectedEmployee } = useEmployee();
    const [message, setMessage] = useState("");
    const employeesPerPage = 10;

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

    // Handle checkbox change to select/deselect employees
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, employee: Employee) => {
        if (e.target.checked) {
            setSelectedIds((prev: string[]) => [...prev, employee.id]);
        } else {
            setSelectedIds((prev) => prev.filter((id) => id !== employee.id));
        }
    };

    const downloadFile = async(id : string) => {
        const response = await DownloadFile(id);
        console.log(response);
    }

    return (
        <div className="text-black w-full h-[530px]">
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
                    <th scope="col">ID Proof</th>
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
                            data-department={employee.dept}
                            data-role={employee.role}
                            data-email={employee.email}
                            data-salary={employee.salary}
                            data-phone={employee.phone}
                            data-experience={employee.experience}
                            onClick={(e) => {
                                const target = e.target as HTMLElement;
                                if (target.tagName === "INPUT" && ((target as HTMLInputElement).type === "checkbox" || (target as HTMLInputElement).type === "button")) {
                                    return;
                                }

                                // Check if the click is inside a td containing a checkbox or button
                                const closestInput = target.closest("td")?.querySelector("input[type='checkbox'], input[type='button']");
                                if (closestInput) {
                                    return;
                                }
                                setSelectedEmployee(employee);
                                router.push(`/employee/employeeCreation`);
                            }}
                        >
                            <td className="border-none">
                                <Checkbox
                                    onChange={(e) => handleCheckboxChange(e, employee)}
                                />
                            </td>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.dept}</td>
                            <td>{employee.role}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.experience}</td>
                            <td>
                                <button className="border-none bg-white w-10 flex items-center justify-center"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    downloadFile(employee.id);
                                  }}>
                                    <Image src="/file.png" width={20} height={10} alt="" />
                                </button>
                            </td>
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
