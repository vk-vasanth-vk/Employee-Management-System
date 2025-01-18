import React from "react";
import axios from "axios";

const InsertData = async(name,dept,email,salary,phone) => {
    try {
        const response = await axios.post("http://localhost:8080/insertRecord", {
            name,
            dept,
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