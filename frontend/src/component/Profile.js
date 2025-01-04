import React from 'react'
import Logout from './Logout'
import useStore from "../store/store";

const Profile = () => {
  const { isLogin, user } = useStore();
  console.log(user.userName);
  console.log(user);
  // const actualuser =  
  // {

  return (
    <>
      {
        isLogin ? (
          <div className="flex items-center justify-center min-h-screen bg-black">
            <div className=" rounded-lg shadow-md p-8 max-w-md text-center">
              <h1 className="text-4xl font-bold text-white">Welcome Back ! {user.userName[0].toUpperCase()+ user.userName.slice(1)}</h1>
              <p className="mt-4 text-gray-300">
                We're glad to see you again. Explore your dashboard and enjoy your stay!
              </p>
              <div className="mt-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-200 mb-10">
                  Go to Dashboard
                </button>
              </div>
            <Logout />
            </div>
          </div>
        ) : (<p className="text-white">error page not found </p>)
      }
    </>
  )
}

export default Profile
