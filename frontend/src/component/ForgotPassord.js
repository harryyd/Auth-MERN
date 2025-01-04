import React from "react";
// import * as yup from 'yup';
import {useState} from "react"
// import { useNavigate } from "react-router-dom";
import sendPasswordResetEmail from "./Mail";


export const ForgotpassordFindByEmail = () => {

    const [email , setEmail] = useState("") ; 

    const submitHandler = (e) => {
        e.preventDefault();
        //check for email 
        sendPasswordResetEmail(email) ; 
        alert("email send to you mail") ; 
        
        // if present then email going to send otherwise emial donot registered 
    }   
    return (
        <>
            <p>
                for forget passwword please enter you email
            </p>
            <div className="items-center border-2 border-black min-h-[500px]">
                <form onSubmit={submitHandler} className="w-full max-w-md space-y-4">
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            required
                            name = "email"
                            value = {email}
                            onChange={(e)=> setEmail(e.target.value)}
                            className="appearance-none rounded-md block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </div>

        </>
    )
}




const ForgotPassord = () => {
    return (
        <div>
            forgotPassord
            <ForgotpassordFindByEmail />
        </div>
    )
}

export default ForgotPassord
