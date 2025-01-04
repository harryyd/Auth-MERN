import React from 'react'
import { useState } from 'react'
import * as Yup from "yup";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

// import { useState } from 'react-router-dom'
// import Form from './Form'

const Signup = () => {

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [type, setType] = useState({
    password: "text",
    confirmPassword: "password"
  });


  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const sendDataBackend = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/signup', formData);
      console.log('Response:', response.data);
      navigate('/otp');
    } catch (error) {
      alert(error.response.data.message)
      console.error('Error:', error.response.data.message);
    }
  }

  const validationSchema = Yup.object({
    userName: Yup.string().required("Name is Required"),
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one symbol")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted", formData);
      await sendDataBackend();
      // sends to backend  
      setErrors({});
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };


  return (
    <div>

      <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-black p-10 rounded-xl shadow-md border-2 border-gray-200 ">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Sign up </h2>

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Create your account
          </h2>
          <form className="mt-8 space-y-10" onSubmit={handleSubmit}>

            <div className="rounded-md shadow-sm -space-y-15">

              {/* <div className="mb-4">
                <label htmlFor="userName" className="sr-only">Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="username"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>
                {errors.userName && <p className="mt-2 text-sm text-red-600">{errors.userName}</p>}
              </div> */}

              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:border-blue-500'
                }`}
                    placeholder="Enter your User Name"
                  />
                </div>
                {errors.userName && <span className="text-red-500 text-sm mt-1">{errors.userName}</span>}
              </div>

              {/*Email */}
              <div className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:border-blue-500'
                }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
              </div>


              {/* passowrd */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input

                    type={type.password}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:border-blue-500'
                  }`}
                    placeholder="Enter your password"
                  />
                  <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setType((prev) => (
                      {
                        ...prev,
                        password: prev.password === 'password' ? 'text' : 'password'
                      }
                    )
                    )}>
                    {type.password === 'password' ? (
                      <IoMdEye />
                    ) : (
                      <IoIosEyeOff />
                    )}
                  </span>
                </div>
                {/* <div className=''> <Link to="/forgotpassword" className="text-xs text-blue-600 hover:text-blue-800 transition duration-200">forgot password ?</Link></div> */}
                {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
              </div>


              {/* confirmPassword */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input

                    type={type.confirmPassword}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:border-blue-500'
                  }`}
                    placeholder="Enter your password"
                  />
                  <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setType((prev) => (
                      {
                        ...prev,
                        confirmPassword: prev.confirmPassword === 'password' ? 'text' : 'password'
                      }
                    )
                    )}>

                    {type.confirmPassword    === 'password' ? (
                      <IoMdEye />
                    ) : (
                      <IoIosEyeOff />
                    )}
                  </span>
                </div>
                {/* <div className=''> <Link to="/forgotpassword" className="text-xs text-blue-600 hover:text-blue-800 transition duration-200">forgot password ?</Link></div> */}
                {errors.confirmPassword && <span className="text-red-500 text-sm mt-1">{errors.confirmPassword}</span>}
              </div>



            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Account
              </button>
            </div>
            <div className="text-center text-sm text-gray-600"> already have an account? <Link to="/login" className="text-blue-500">Login</Link> </div>
          </form>
        </div>

      </div>


      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"

        />
      </div>

    </div>
  )
}

export default Signup



// {/* Password
// <div className="mb-4">
//   <label htmlFor="password" className="sr-only">Password</label>
//   <div className="relative">
//     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//       <FaLock className="h-5 w-5 text-gray-400" />
//     </div>
//     <input
//       id="password"
//       name="password"
//       type="password"
//       required
//       className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//       placeholder="Password"
//       value={formData.password}
//       onChange={handleChange}
//     />
//   </div>
//   {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
// </div> */}

// {/* Confirm Password */}
// {/* <div className="mb-4">
//   <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
//   <div className="relative">
//     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//       <FaLock className="h-5 w-5 text-gray-400" />
//     </div>
//     <input
//       id="confirmPassword"
//       name="confirmPassword"
//       type="password"
//       required
//       className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//       placeholder="Confirm Password"
//       value={formData.confirmPassword}
//       onChange={handleChange}
//     />
//   </div>
//   {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
// </div> */}