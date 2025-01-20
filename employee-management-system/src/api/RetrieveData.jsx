// Function to retrieve employees
export const RetrieveData = async (setEmployees, id) => {
    try {
        const response = await fetch(`http://localhost:8080/getEmployees`);

        if (!response.ok) {
            throw new Error("Failed to fetch employees");
        }

        const data = await response.json(); // Parse the response as JSON
        setEmployees(data); // Update the state with the fetched data
    } catch (error) {
        console.log("Error fetching employees:", error);
        // setMessage("Failed to fetch employees");
    }

};
