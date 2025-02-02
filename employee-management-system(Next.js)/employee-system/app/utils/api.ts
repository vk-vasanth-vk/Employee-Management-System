import Employee from "@/app/types/Employee";
const  BASE_URL = "http://localhost:8080";
import axios from "axios";
let fetchURL = "";

// Fetch all employees (GET)
export async function RetrieveData() {
    try {
        const response = await axios.get(`${BASE_URL}/getEmployees`);
        return response.data;
    } catch(error) {
        console.log(error);
    }
}

// Create a new employee (POST)
export async function createEmployee(name: string, dept: string, role: string, email: string, salary: string, phone: string, experience: string) {
    try {
        const response = await axios.post(`${BASE_URL}/insertRecord`, {
            body: JSON.stringify({
                name,
                department: dept,
                role,
                email,
                phoneNo: phone,
                salary,
                year_of_experience: experience,
            }),
            }        
        );

        return response.data;
    } catch(error) {
        console.log(error);
    }
}

// Delete employee(s) (DELETE)
export async function DeleteData(idList: number[]) {
    try {
        const response = await axios.delete(`${BASE_URL}/delete-data/${idList}`);
        return response.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
}

// Filter employees by department and role (GET)
export async function FilterData(name:string, dept:string, role:string) {
    const params = new URLSearchParams();

    if(name) {
        params.append("name", name);
    }
    if(dept) {
        params.append("dept", dept);
    }
    if(role) {
        params.append("role", role);
    }

    if(params.toString()) {
        fetchURL = `${BASE_URL}/filterEmployees?${params.toString()}`;
    }

    try {
        const response = await axios.get(fetchURL);
        return response.data;
    } catch(error) {
        console.log(error);
        throw  error;
    }
}

// Update employee details (PUT)
export async function UpdateData(id: number, name: string, department: string, role: string, email: string, salary: string, phoneNo: string, year_of_experience: string) {

    try {
        const response = await axios.put(`${BASE_URL}/update-details`, {
            id,
            name,
            department,
            role,
            email,
            salary,
            phoneNo,
            year_of_experience,
        });

        return response.data;
        } catch(error) {
            console.log(error);
        }  
}

// Upload file
export async function UploadFile(file: FormData) {
    try { 
        const response = await axios.post(`${BASE_URL}/uploadFile`, file, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
    } catch(error) {
        console.log(error);
    }
}