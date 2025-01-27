'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";
import "../styles/style.css";
import {Button} from '@mui/material';
import  { createEmployee,UpdateData,UploadFile }  from "../../utils/api";

const EmployeeCreation = () => {

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [dept, setDept] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [salary, setSalary] = useState("");
    const [phone, setPhone] = useState("");
    const [experience, setExperience] = useState("");
    const [message, setMessage] = useState("");
    const [update, setUpdate] = useState(false);
    const [employeeData, setEmployeeData] = useState([]);
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    let rowData: { id?: string, name?: string, department?: string, role?: string, email?: string, salary?: string, phone?: string } = {};
  

    const roleList = [
        { dept: "Design", role: "Graphic Designer" },
        { dept: "Design", role: "UI/UX Designer" },
        { dept: "Development", role: "Web Developer" },
        { dept: "Development", role: "DevOps Engineer" },
        { dept: "Testing", role: "Quality Analyst" },
        { dept: "Human Resource", role: "HR Recruiter" },
    ];

    // Populate form fields with data from TableComponentPage
    useEffect(() => {
      if (searchParams) {
          const data = Object.fromEntries(searchParams.entries());
          if(data.id) {
            setId(data.id);
            setName(data.name);
            setDept(data.department);
            setRole(data.role);
            setEmail(data.email);
            setSalary(data.salary);
            setPhone(data.phone);
            setExperience(data.experience);
            setUpdate(true);
          }
      }
  }, [searchParams]);


    // Auto-clear messages after 5 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const validateFields = () => {
        if (!name || !email || !role || !phone || !dept || !salary || !experience) {
            setMessage("All fields are required");
            return false;
        }

        if (/\d/.test(name)) {
            setMessage("Name shouldn't contain any numbers!");
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setMessage("Enter a valid email address!");
            return false;
        }

        const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/;
        if (!phoneRegex.test(phone) || phone.length < 10) {
            setMessage("Enter a valid phone number!");
            return false;
        }

        if (salary < 0) {
            setMessage("Enter a valid salary");
            return false;
        }

        return true;
    };

    //Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!validateFields()) {
        console.log("Validation failed");
        return;
      }

      try {
        if(update) {
          const response = await UpdateData(Number(id), name, dept, role, email, salary, phone, experience);
          setMessage("Employee details updated successfully");
          if(response) {
            router.push("/employee/employeeList");
          }
        } else {
          const response = await fetch(`http://localhost:8080/insertRecord`, {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                          name,
                          department: dept,
                          role,
                          email,
                          phoneNo: phone,
                          salary,
                          year_of_experience: experience,
                      }),
                  });
          
                  // return response.json();

          setMessage("Employee details created successfully");
          if(response) {
            router.push("/employee/employeeList");
          }
        }
        // resetForm();
      } catch (error) {
        // setMessage("Failed to create employee");
        console.error("Failed to update employee", error);
      }
    }

    const uploadFile = async () => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                const response = await UploadFile(formData);
            } catch (error) {
                console.error("Failed to upload file", error);
            }
        } else {
            console.error("No file selected");
        }
    }

    const resetForm = () => {
        setName("");
        setEmail("");
        setDept("");
        setRole("");
        setSalary("");
        setPhone("");
    };

  return (
    <>
    {domLoaded && (
      <div>
      {/* Header */}
      <div className="w-full h-[80px] border-b"></div>

      {/* Form Wrapper */}
      <div>
        {/* Notification / Message Section */}
        <div className="w-full h-10 flex justify-center text-red-500 text-[20px]">
          {/* Add dynamic message here if required */}
          {message && <p>{message}</p>}
        </div>

        {/* Form Title */}
        <h1 className="text-2xl font-bold ml-[350px]">Employee Details</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-row">
            {/* Labels Section */}
            <div className="flex flex-col space-y-[34px] ml-[350px] mt-[30px] min-w-[200px] h-[350px]">
              <label>Name</label>
              <label>Department</label>
              <label>Designation</label>
              <label>Email ID</label>
              <label>Phone No</label>
              <label>Salary</label>
              <label>Experience</label>
              <label>ID Proof</label>
            </div>

            {/* Inputs Section */}
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-400 p-2 ml-4 w-[400px]"
              />

              <select
                className="border border-gray-400 p-2 ml-4 w-[400px]"
                value={dept}
                onChange={(event) => setDept(event.target.value)}
              >
                <option value="">Select Department</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Testing">Testing</option>
                <option value="Human Resource">Human Resource</option>
              </select>

              <select
                className="border border-gray-400 p-2 ml-4 w-[400px]"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                disabled={!dept}
                title={!dept ? "Select the Department" : ""}
              >
                <option value="">Select Designation</option>
                {/* Uncomment and handle dynamic designation options */}
                {dept &&
                  roleList
                    .filter((Role) => Role.dept === dept)
                    .map((Role, index) => (
                      <option value={Role.role} key={index}>
                        {Role.role}
                      </option>
                    ))}
              </select>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-400 p-2 ml-4 w-[400px]"
              />

              <input
                type="text"
                placeholder="Enter Phone no"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-400 p-2 ml-4 w-[400px]"
              />

              <input
                type="number"
                placeholder="Enter Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="border border-gray-400 p-2 ml-4 w-[400px]"
              />

              <input
                type="number"
                placeholder="Enter Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="border border-gray-400 p-2 ml-4 w-[400px]"
              />

              <input
                type="file"
                placeholder="Upload file"
                accept=".txt"
                title="Upload .txt file"
                className="border border-gray-400 p-2 ml-4 w-[400px]"
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>
            <div className="mt-[427px] ml-5">
              <Button className="w-16 h-8"
                variant="contained"
                type="button"
                onClick={uploadFile}
              >Upload</Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row items-center justify-center space-x-4 mt-8 mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {update ? "Save" : "Create"}
            </button>

            <Link href="/employee/employeeList">
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
    )}
  </>
  );
}

export default EmployeeCreation;