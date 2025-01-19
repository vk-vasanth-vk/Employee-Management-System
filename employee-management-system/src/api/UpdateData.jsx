import axios from "axios";

const UpdateData = async (id, name, department, role, email, salary, phoneNo) => {
    try {
        const response = await axios.put(`http://localhost:8080/update-details`, {
            id,
            name,
            department,
            role,
            email,
            salary,
            phoneNo
        });

        return response;
    } catch (error) {
        console.error("Error updating details:", error.response || error.message);
        throw new Error("Error updating details: " + error.message); // Throwing a more informative error
    }
};

export default UpdateData;
