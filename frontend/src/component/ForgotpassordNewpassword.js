import * as yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';


export const ForgotpassordNewpassword = () => {

    const navigate = useNavigate() ; 
    const { token } = useParams();
    const [passworddata , setPassworddata] = useState({
        password: "",
        confirmPassword: "",
    });  

    const [errors, setErrors] = useState({});


    const validationSchema = yup.object({
        password: yup
            .string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
    })

    const changehandler = (e) => {
        // const [name  , value] = e.target ; 
        setPassworddata({ ...passworddata, [e.target.name]: e.target.value });
    }

    console.log(passworddata);


    const submitHandler = async (e) => {
        e.preventDefault();

        try{
            await validationSchema.validate(passworddata, { abortEarly: false }) ; 
            const response = await axios.post(`http://localhost:4000/api/resetpassword/${token}`, passworddata , {withCredentials: true}); //problem lies here 
            //backend store the new password
            console.log("this is the" ,response);
            navigate('/confirm'); 
            
        }catch(error) {
            // const newErrors = {} ; 
            // error.inner.forEach((err) => {
            //     newErrors[err.path] = err.message;
            //   });
            //   setErrors(newErrors);
            console.log(error);
         }
    }   
    // console.log(errors) ; 
    return (
        <>
            <p> enter your new password </p>
            <form onSubmit={submitHandler} className="space-y-4">
                <div className="relative">
                    <input
                        type="password"
                        placeholder="New Password"
                        required
                        onChange={changehandler}
                        name = "password"
                        value={passworddata.password}
                        className="appearance-none rounded-md block w-2/5 px-4 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                <div className="relative">
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        required
                        onChange={changehandler}
                        name = "confirmPassword"
                        value={passworddata.confirmPassword}
                        className="appearance-none rounded-md block w-2/5  px-4 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
                <button
                    type="submit"
                    className="w-2/5 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>

        </>
    )
}