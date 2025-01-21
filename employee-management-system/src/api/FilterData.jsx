const FilterData = async (dept, role) => {
    try {
        // console.log(`dept: ${dept}, role:${role}`);
        // // Ensure filters are provided
        // if (!dept && !role) {
        //     throw new Error("Filters are empty!");
        // }

        let url = ``;

        if(dept && role) {
            let encodedDept = encodeURIComponent(dept);
            let encodedRole = encodeURIComponent(role);
            url += `http://localhost:8080/filterEmployees/${encodedDept}/${encodedRole}`;
        }

        else if(dept && !role) {
            let encodedDept = encodeURIComponent(dept)
            url += `http://localhost:8080/filterEmployeesByDept/${encodedDept}`;
        }

        else {
            let encodedRole = encodeURIComponent(role);
            url += `http://localhost:8080/filterEmployeesByRole/${encodedRole}`;
        }

        // Fetch data from the server
        const response = await fetch(url);
        // console.log(response);

        // Handle non-OK responses
        if (!response.ok) {
            let errorMessage = "An error occurred!";
            try {
                const errorDetails = await response.json();
                errorMessage = errorDetails.message || errorMessage;
            } catch (jsonError) {
                console.error("Failed to parse error response JSON:", jsonError);
            }
            throw new Error(errorMessage);
        }

        // Parse and return the JSON data
        const data = await response.json();
        return data;

    } catch (error) {
        // Log and rethrow the error for further handling
        console.error("Error in FilterData:", error.message);
        throw error;
    }
};

export default FilterData;
