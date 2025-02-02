import Employee from "@/app/types/Employee";
const  BASE_URL = "http://localhost:8080";
let fetchURL = "";

// Fetch all employees (GET)
export async function RetrieveData() {
    const response = await fetch(`${BASE_URL}/getEmployees`);
    if(!response.ok) throw new Error("Failed to fetch employees");
    return response.json();
}

// Create a new employee (POST)
export async function createEmployee(name: string, dept: string, role: string, email: string, salary: string, phone: string, experience: string) {
    try {
        const response = await fetch(`${BASE_URL}/insertRecord`, {
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
            }        
        );

        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}

// Delete employee(s) (DELETE)
export async function DeleteData(idList: number[]) {
    const response = await fetch(`${BASE_URL}/delete-data/${idList}`, {
        method: "DELETE",
    });
    if(!response.ok) throw new Error("Failed to delete employee");
    return response.json();
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

    console.log(fetchURL);

    const response = await fetch(fetchURL);
    if(!response.ok) throw new Error("Failed to filter employees");
    return response.json();
}

// Update employee details (PUT)
export async function UpdateData(id: number, name: string, department: string, role: string, email: string, salary: string, phoneNo: string, year_of_experience: string) {

    const response = await fetch(`${BASE_URL}/update-details`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id,
            name,
            department,
            role,
            email,
            salary,
            phoneNo,
            year_of_experience
        }),
    });

    const data = await response.json();

    if(!response.ok) throw new Error("Failed to update employee");
    return data;
}

// Upload file
export async function UploadFile(file: FormData) {
    console.log(file);

    const response = await fetch(`${BASE_URL}/uploadFile`, {
        method: "POST",
        body: file,
    });
    if(!response.ok) {
        return("Failed to upload file");
    }
}