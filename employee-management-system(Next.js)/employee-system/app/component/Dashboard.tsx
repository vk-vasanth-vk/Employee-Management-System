"use client";
import { RetrieveData } from "../utils/api"; 
import { useEffect, useState } from "react";
import Employee from '@/app/types/Employee';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [department, setDepartment] = useState<string>('');
  const [genderChartData, setGenderChartData] = useState<{ name: string; value: number }[]>([]);
  const COLORS = ["#8884d8", "#82ca9d", "#FF5733"];

  useEffect(() => {
    async function fetchData() {
      const response = await RetrieveData();
      setEmployees(response);
    }
    fetchData();
  }, []);

  // Prepare data for department-wise employees
  const departmentData = employees.reduce((acc: { [key: string]: number }, emp) => {
    acc[emp.dept] = (acc[emp.dept] || 0) + 1;
    return acc;
  }, {});
  const departmentChartData = Object.keys(departmentData).map((dept) => ({ name: dept, value: departmentData[dept] }));

  useEffect(() => {
    // Filter employees based on selected department
    const filteredEmployees = department
      ? employees.filter((emp) => emp.dept === department)
      : employees;

    // Reduce function to count gender occurrences
    const genderData = filteredEmployees.reduce((acc: { [key: string]: number }, emp) => {
      if (emp.gender) {
        acc[emp.gender] = (acc[emp.gender] || 0) + 1;
      }
      return acc;
    }, {});

    // Convert object into array format needed for Recharts
    const formattedData = Object.keys(genderData).map((gender) => ({
      name: gender,
      value: genderData[gender],
    }));

    setGenderChartData(formattedData);
  }, [department, employees]);

  // Function to calculate percentage and display label
  const renderLabel = ({ name, value, percent }: any) => {
    return `${name}: ${(percent * 100).toFixed(1)}%`;
  };

  const handleDeptChange = (e): void => {
    setDepartment(e.target.value);
  };

  // Salary Data Processing
  const totalSalary:number = employees.reduce((sum, emp) => sum + Number(emp.salary), 0);

  const departmentSalaryData = employees.reduce((acc, emp) => {
    acc[emp.dept] = (acc[emp.dept] || 0) + Number(emp.salary);
    return acc;
  }, {});

  // Convert salary data to percentage-based data for BarChart
  const salaryChartData = Object.keys(departmentSalaryData).map((dept) => ({
    name: dept,
    salaryPercentage: (departmentSalaryData[dept] / totalSalary) * 100,
    salaryAmount: departmentSalaryData[dept]
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Report Dashboard</h1>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Employees Gender by Department (Pie Chart) */}
        <div className="border bg-white p-4 rounded-xl border-gray-400 hover:shadow-xl">
         <div className="flex flex-row items-center h-10">
          <h2 className="text-lg font-semibold mb-2">Employees gender by Department</h2>
          <select 
            className="mt-0 ml-auto"
            onChange={handleDeptChange}
          >
            <option value="">All</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="Human Resource">Human Resource</option>
          </select>
         </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie 
                data={genderChartData} 
                dataKey="value" 
                nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" 
                label={renderLabel} 
              >
                {genderChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Salary Distribution (Bar Chart) */}
        <div className="bg-white p-4 rounded-xl border border-gray-400 hover:shadow-xl">
          <div className="flex flex-row items-center mb-6">
            <h2 className="text-lg font-semibold mb-2">Salary Distribution</h2>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salaryChartData}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${value.toFixed(2)}%`} />
              <Tooltip formatter={(value, name, props) => [`${props.payload.salaryAmount}`, "Salary Amount"]} />
              <Bar dataKey="salaryPercentage" fill="#82ca9d">
                {salaryChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <h2>Total Cost: {totalSalary}</h2>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
