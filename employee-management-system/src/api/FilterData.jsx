import React from "react";

const FilterData = async(dept) => {
    try {
        const response = await fetch(`http://localhost:8080/getEmployeesByDept/${dept}`);

        if (!response.ok) {
            const errorDetails = await response.json(); // Fetch detailed error message from the response
            console.error("Server responded with an error:", errorDetails.message);
            throw new Error(errorDetails.message);
        }

        const data = await response.json();
        return data;

    } catch(error) {
        console.error(error);
    }
}

export default FilterData;