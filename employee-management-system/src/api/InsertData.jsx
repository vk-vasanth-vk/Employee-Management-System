import axios from "axios";

const InsertData = async(name,dept,role,email,salary,phone) => {
    try {
        const response = await axios.post("http://localhost:8080/insertRecord", {
            name,
            dept,
            role,
            email,
            salary,
            phone,
        });
        return(response);
    } catch (error) {
        throw error;
    }
};

export default InsertData;