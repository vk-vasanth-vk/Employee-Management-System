import Employee from "@/app/types/Employee";
const  BASE_URL = "http://localhost:8080";
import axios from "axios";
let fetchURL = "";

// Fetch all employees (GET)
export async function RetrieveData() {
    try {
        const response = await axios.get(`${BASE_URL}/getAllDocs`);
        return response.data;
    } catch(error) {
        console.log(error);
    }
}

// Create a new employee (POST)
export async function createEmployee(name: string, dept: string, role: string, email: string, salary: string, phone: string, experience: string) {
    try {
        const response = await axios.post(`${BASE_URL}/addDoc`, {
                name,
                dept,
                role,
                email,
                phone,
                salary,
                experience
            })

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
export async function UpdateData(file: FormData) {
    try { 
        const response = await axios.put(`${BASE_URL}/update-details`, file, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
    } catch(error) {
        console.log(error);
        return error;
    } 
}

// Upload file
export async function UploadFile(file: FormData) {

    try { 
        const response = await axios.post(`${BASE_URL}/addDoc`, file, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
    } catch(error) {
        console.log(error);
    }
}

export async function DownloadFile(id: string) {
    try {
        console.log();
        const response = await axios.get(`${BASE_URL}/downloadFile/${id}`, {
            responseType: 'blob', // Handle binary data
            headers: {
                'Accept': 'application/octet-stream', // Expect binary data
            },
        });

        const blob = response.data as Blob; // Get the binary file content
        const downloadUrl = URL.createObjectURL(blob); // Create a URL for the blob

        const link = document.createElement('a'); // Create an anchor element
        link.href = downloadUrl; // Set the href to the blob URL
        link.download = `document-${id}.pdf`; // Set the file name for download
        link.click(); // Trigger the download
    } catch (error) {
        console.error("Error fetching file:", error);
    }
};

export async function PreviewFile(id: string) {
    try {
        const response = await axios.get(`${BASE_URL}/viewFile/${id}`)
        
        if (response.status === 200 && response.data) {
            // const fileUrl = `data:image/png;base64,${response.data}`;
            return response.data;
        } else {
            console.error("Failed to retrieve file");
        }
    } catch (error) {
        console.log(error);
    }
}