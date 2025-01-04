import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useStore  from '../store/store';

const Logout = () => {

    const navigate = useNavigate(); 
    const {setlogout} = useStore();

    const logoutHandler = async() => {
        try{
            const response  = await axios.get('http://localhost:4000/api/logout' , {withCredentials: true} ) ;
            console.log(response); 
            setlogout(false) ; 
            navigate('/') ;
        }catch(error) {
            console.error('Error:', error); 
        }
    }
  return (
    <div className='flex justify-center'>
      <button onClick={logoutHandler} className='items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors'> Logout </button>
    </div>
  )
}

export default Logout
