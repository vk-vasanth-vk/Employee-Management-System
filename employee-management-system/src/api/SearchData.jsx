const SearchData = async(name, dept) => {
    if(name === null || name === "")
        return null;

    let url = 'http://localhost:8080/filterEmployees';
    const params = new URLSearchParams();

    if(dept && name)
    {
        params.append('dept', dept);
        params.append('name', name);
    }

    if(params.toString()) {
        url += '?'+ params.toString();
    }

    try{
        const response = await fetch(url);
        console.log(response);

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