import axios from "axios";

const UpdateData = async (id, name, department, role, email, salary, phoneNo) => {
    try {
        // Sending the PUT request to update details
        const response = await axios.put(`http://localhost:8080/update-details`, {
            id,
            name,
            department,
            role,
            email,
            salary,
            phoneNo
        });

        // Log the response from the backend (useful for debugging)
        console.log("Update response:", response.data);

        return response; // Return the response after successful update
    } catch (error) {
        // Log error details to the console
        console.error("Error updating details:", error.response ? error.response.data : error.message);

        // Throw a more informative error
        throw new Error("Error updating details: " + (error.response ? error.response.data : error.message));
    }

};

export default UpdateData;
