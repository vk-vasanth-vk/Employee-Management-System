import axios from "axios";

const DeleteData = async (id) => {

    try {
        // Send the DELETE request to the backend
        const response = await axios.delete(`http://localhost:8080/delete-data/${id}`);

        // Optionally handle the response, you can log or return a message
        console.log(response.data); // Log the server response
        return "Data deleted successfully";  // Return success message
    } catch (error) {
        // Handle error if DELETE request fails
        console.error("Error deleting data:", error); // Log the error for debugging
        throw new Error("Failed to delete data");  // Throw error with a custom message
    }

}

export default DeleteData;