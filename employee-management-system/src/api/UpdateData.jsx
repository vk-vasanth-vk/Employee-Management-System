import React from "react";
import axios from "axios";

const UpdateData = async(name,department,email,salary,phone) => {
    try{
        const response = await axios.put(`http://localhost:8080/update-details`, {
            name,
            department,
            email,
            salary,
            phone
        });

        return(response);
    } catch (error) {
        throw ("Error updating details" + error);
    }
};

export default UpdateData;