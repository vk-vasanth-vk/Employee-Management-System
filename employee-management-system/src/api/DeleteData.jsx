import axios from "axios";

const DeleteData = async (id) => {
    id = Number(id);
    console.log(typeof id);

    try {
        const response = await axios.delete(`http://localhost:8080/delete-data/${id}`);
        return ("Data deleted successfully");
    } catch (error) {
        throw error;
    }
}

export default DeleteData;