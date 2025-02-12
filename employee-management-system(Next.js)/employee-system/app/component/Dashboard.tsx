"use client";
import { RetrieveData } from "../utils/api"; 
import { useEffect, useState } from "react";
import Employee from '@/app/types/Employee';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await RetrieveData();
      setEmployees(response);
    }
    fetchData();
  }, []);

  const[genderData, setGendetData] = useState();

  // Prepare data for charts
  const departmentData = employees.reduce((acc: { [key: string]: number }, emp) => {
    acc[emp.dept] = (acc[emp.dept] || 0) + 1;
    return acc;
  }, {});
  const departmentChartData = Object.keys(departmentData).map((dept) => ({ name: dept, value: departmentData[dept] }));

  const salaryChartData = employees.map((emp) => ({ name: emp.name, salary: emp.salary }));

  const experienceData = employees.reduce((acc: { [key: string]: number }, emp) => {
    const category = emp.experience < 2 ? "0-2 yrs" : emp.experience < 5 ? "3-5 yrs" : "5+ yrs";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});
  const experienceChartData = Object.keys(experienceData).map((exp) => ({ name: exp, value: experienceData[exp] }));

  const genderData = employees.reduce((acc: { [key: string]: number }, emp) => {
    acc[emp.gender] = (acc[emp.gender] || 0) + 1;
    return acc;
  }, {});
  const genderChartData = Object.keys(genderData).map((gender) => ({ name: gender, value: genderData[gender] }));

  // Function to Calculate Percentage and Display Label
    const renderLabel = ({ name, value, percent }: any) => {
    return `${name}: ${(percent * 100).toFixed(1)}%`;
  };

  const handleDeptChange = (e) => {
    
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">HR Dashboard</h1>

      {/* Employee Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Designation</th>
              <th className="border p-2">Salary</th>
              <th className="border p-2">Experience (yrs)</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.email} className="text-center border">
                <td className="border p-2">{emp.name}</td>
                <td className="border p-2">{emp.dept}</td>
                <td className="border p-2">{emp.role}</td>
                <td className="border p-2">₹{emp.salary}</td>
                <td className="border p-2">{emp.experience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Department-wise Employees (Pie Chart) */}
        <div className="border bg-white p-4 rounded-xl border-gray-400 hover:shadow-xl">
         <div className="flex flex-row relative h-10">
          <h2 className="text-lg font-semibold mb-2">Employees by Department</h2>
          <select className="absolute right-0 top-0">
            <option value="">All</option>
            <option onChange={handleDeptChange}>Design</option>
            <option onChange={handleDeptChange}>Development</option>
            <option onChange={handleDeptChange}>Testing</option>
            <option onChange={handleDeptChange}>Human Resource</option>
          </select>
         </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie 
                data={genderChartData} 
                dataKey="value" 
                nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" 
                label={renderLabel} 
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Salary Distribution (Bar Chart) */}
        <div className="bg-white p-4 rounded-xl border hover:shadow-xl">
          <h2 className="text-lg font-semibold mb-2">Salary Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salaryChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="salary" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Experience Level (Pie Chart) */}
        <div className="bg-white p-4 rounded-xl border border-gray-400 hover:shadow-xl">
          <h2 className="text-lg font-semibold mb-2">Experience Levels</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={experienceChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#FF5733" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;