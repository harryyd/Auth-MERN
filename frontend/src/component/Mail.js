import axios from "axios";
const sendPasswordResetEmail = async (email) => {
    try {
        const response = await axios.post(
            "http://localhost:4000/api/resetMail",
            { email }
        );
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};

export default sendPasswordResetEmail ; 