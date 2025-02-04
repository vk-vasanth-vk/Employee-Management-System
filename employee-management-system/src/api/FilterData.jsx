const FilterData = async (dept, role) => {
        let url = 'http://localhost:8080/filterEmployees';
        const params = new URLSearchParams();

        if(dept && role) {
            params.append('dept',dept);
            params.append('role',role);
        } else if(dept) {
            params.append('dept',dept);
        }  else if(role) {
            params.append('role',role);
        }

        if(params.toString()) {
            url += '?'+ params.toString();
        }

    try {
        // Fetch data from the server
        const response = await fetch(url);

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
