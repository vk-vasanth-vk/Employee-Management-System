import axios from "axios";

const InsertData = async (name, dept, role, email, salary, phone) => {

    try {
        const response = await fetch("http://localhost:8080/insertRecord", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                dept,
                role,
                email,
                salary,
                phone,
            }),
        });

        if (!response.ok) {
            const errorDetails = await response.json(); // Fetch detailed error message from the response
            console.error("Server responded with an error:", errorDetails.message);
            throw new Error(errorDetails.message);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error occurred while inserting data:", error.message);
       // Rethrow the error for further handling in the calling function
    }
};

export default InsertData;
