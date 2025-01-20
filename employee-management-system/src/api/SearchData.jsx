const SearchData = async(name) => {
    if(name === null)
        return

    try{
        const response = await fetch(`http://localhost:8080/searchByName/${name}`);

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

export default SearchData;