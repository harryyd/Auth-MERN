import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useStore from '../store/store';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { setlogin , setUser } = useStore();

  const [type, setType] = useState('passord');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      url: "http://localhost:4000/api/login",
      data: formData
    }
    const postData = async () => {
      try {
        const response = await axios.post(data.url, data.data, { withCredentials: true });
        console.log('Response:', response.data);
        setlogin(true);
        setUser(response.data.user);
        toast.success("Login Successfull");

        setTimeout(() => {
        navigate('/');
        } , 1000)
        
      } catch (error) {
        console.error('Error:', error.response.data.message);
        toast.error(error.response.data.message)
      }
    };

    postData();

  };

  const signupHandler = () => {
    navigate('/signup');
  }

  return (
    
    <div className="flex justify-center items-center min-h-screen bg-black">
    <Toaster 
        position="top-center"
        reverseOrder={false}
    />
      <form className="bg-black p-8 rounded-lg shadow-md w-full max-w-md border-2 border-gray-400" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Login</h2>

        <div className="mb-4">
          <label htmlFor="companyEmail" className="block mb-2 font-medium text-gray-700">
            Email
          </label>
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
          {/* {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>} */}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input

              type={type}
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
              onClick={() => setType(type === 'password' ? 'text' : 'password')}
            >
              {type === 'password' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0 2a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 110 8 4 4 0 010-8z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0 2a6 6 0 100 12 6 6 0 000-12zm2 6a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
                  <path d="M10 4c2.34 0 4.477 1.16 5.856 2.952a9.066 9.066 0 00-1.416.897C13.47 7.046 11.81 6 10 6a4 4 0 00-4 4c0 .358.04.706.115 1.044A9.072 9.072 0 014.144 8.952C5.623 7.16 7.76 6 10 6z" />
                </svg>
              )}
            </span>
          </div>
          <div className=''> <Link to="/forgotpassword" className="text-xs text-blue-600 hover:text-blue-800 transition duration-200">forgot password ?</Link></div>
          {/* {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>} */}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 flex items-center justify-center"
        >
          <FaSignInAlt className="mr-2" />
          Log In
        </button>
        <p className='tetx-xs mt-3 text-center text-white'> dont have account ? <span onClick={signupHandler} className='text-blue-600 cursor-pointer'> signup </span>  </p>
      </form>

    </div>
  );
};

export default Login;
