import axios from "axios";

// Function to retrieve employees
export const RetrieveData = async (setEmployees, setMessage) => {
    try {
        const response = await axios.get("http://localhost:8080/getEmployees");
        setEmployees(response.data); // Update the state with the fetched data
    } catch (error) {
        console.log("Error fetching employees:", error);
        setMessage("Failed to fetch employees");
    }
};
