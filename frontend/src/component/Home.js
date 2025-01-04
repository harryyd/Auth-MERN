import React, {useState ,useEffect } from 'react'
import { MdHome } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
// import Profile from './Profile';
// import MyContext from './context/MyCotext';
import axios from 'axios'
import useStore from '../store/store';
// import Cookies from 'js-cookie';

export const profile = () => {
  <p> this is profile to  show  the usser </p>
}

const Header = () => {
  // const [login, setLogin] = useState(true);
  const { isLogin } = useStore();
  console.log("this is login inside hom eheader" , isLogin) ;

  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/login")
  }

  const clickProfile = () => {
    navigate("/profile")
  }

  const clickContact = () => {
    navigate('/contact');
  }

  return (
    <div className='flex justify-between h-[70px] border-2 border-black items-center px-10'>
      <p>cuvette</p>
      <div className='flex justify-between items-center w-1/5'>
        <button onClick={clickContact}>
          contact
        </button>
        {
          isLogin ? (
            <div>
              <button className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors' onClick={clickProfile}>
                Profile
              </button>
            </div>
          ) : (
            <button className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors' onClick={clickHandler}>
              Login
            </button>

          )
        }
      </div>
    </div>
  )
}

const Leftside = () => {
  return (
    <div className='flex items-center justify-center h-20 w-24'>
      <MdHome className='text-3xl text-gray-500' />
    </div>
  )
}

// const Maincomponent = ({ actualcomponent }) => {


//   switch (actualcomponent) {
//     case "createInterview":
//       return <>
//         <div className='border-l-[1px] border-black px-10'>
//           <button className='bg-blue-500 text-white text-center px-4 py-2 rounded my-5'>
//             Create Interview
//           </button>
//         </div>
//       </>
//     case "interviewForm":
//       return <>
//         <interviewForm />
//       </>

//     default:
//       return (
//         <>
//           <div className='border-l-[1px] border-black px-10'>
//             <button className='bg-blue-500 text-white text-center px-4 py-2 rounded my-5'>
//               Create Interview
//             </button>
//           </div>
//         </>
//       )

//   }
// }

// CreateInterview Component
  const CreateInterview = ({ setActualComponent }) => {

  const clickHandler = () => {
    setActualComponent('InterviewForm');
  };

  return (
    <div>
      <button
        className='bg-blue-500 text-white text-center px-4 py-2 rounded my-5'
        onClick={clickHandler}
      >
        Create Interview
      </button>
    </div>
  );
};

// InterviewForm Component (Placeholder)
const InterviewForm = ({ setActualComponent }) => {

  const clickHandler = () => {
    setActualComponent("CreateInterview")
  }
  return (
    <div className='py-7 text-gray-600'>
      <button onClick={clickHandler} className=' '> <IoArrowBackOutline /> </button>
      <form className='space-y-4 ml-10'>
        <div className='flex items-center'>
          <label htmlFor="jobTitle" className='w-1/5 font-medium'>Job Title</label>
          <input type="text" id="jobTitle" name="jobTitle" className='w-2/3 px-3 py-2 border-[0.5px] border-gray-300 rounded-md' />
        </div>
        <div className='flex items-start'>
          <label htmlFor="jobDescription" className='w-1/5 font-medium pt-2'>Job Description</label>
          <textarea id="jobDescription" name="jobDescription" rows="4" className='w-2/3 px-3 py-2 border-[0.5px] border-gray-300 rounded-md'></textarea>
        </div>
        <div className='flex items-center'>
          <label htmlFor="experienceLevel" className='block mb-1 font-medium w-1/5'>Experience Level</label>
          <select id="experienceLevel" name="experienceLevel" className='w-2/3 px-3 py-2 border-[0.5px] border-gray-300 rounded-md'>
            <option value="">Select experience level</option>
            <option value="entry">Entry Level</option>
            <option value="intermediate">Intermediate</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div className='flex items-center'>
          <label htmlFor="addCandidate" className='block mb-1 font-medium w-1/5'>Add Candidate</label>
          <input type="email" id="addCandidate" name="addCandidate" placeholder="Enter candidate's email" className='w-2/3 px-3 py-2 border-[0.5px] border-gray-500 rounded-md' />
        </div>
        <div className='flex items-center'>
          <label htmlFor="endDate" className='block mb-1 font-medium w-1/5'>End Date</label>
          <input type="date" id="endDate" name="endDate" className='w-2/3 px-3 py-2 border-[0.5px] border-gray-500 rounded-md' />
        </div>
        <div className='text-center'>
          <button type="submit" className='w-1/3 bg-blue-500 text-white text-sm font-medium my-5 py-2 px-4 rounded-md hover:bg-blue-600 transition-colors items-end'>
            Create Interview
          </button>
        </div>

      </form>
    </div>
  );
};

// Rightside Component
export const Rightside = () => {
  const [actualComponent, setActualComponent] = useState("CreateInterview");

  return (
    <div className='border-l border-black px-10'>
      {actualComponent === "CreateInterview" ? (
        <CreateInterview setActualComponent={setActualComponent} />
      ) : (
        <InterviewForm setActualComponent={setActualComponent} />
      )}
    </div>
  );
};


const Home = () => {

  // const {setlogin} = useStore() ; 

  


  // const {setLogin} = useContext(MyContext) ;
  // useEffect(() => {

  //   const fetchdata =async() =>{
  //     try{
  //       const response = await axios.get('http://localhost:4000/api/test' , {withCredentials: true} ) ;
  //       const token = response.data.istoken; // Access the data from the response
  //       console.log(response); // Log the entire response
  //       console.log(token); 
        
  //       // const 
  //       if(token){
  //         setlogin(true) ;  
  //       }
  //       else{
  //         setlogin(false) ;
  //       }
  //     }catch(error) {
  //       console.error('Error:', error);
  //     }
  //   }
  //   fetchdata() ;
  //   // //if token present in cookie then no need to login again 

  // })

  return (
    <div>
      <Header />
      <div className="flex h-screen">
        <div className='grid grid-cols-[0.5fr_4.5fr] w-4/5 h-5/7 border-2 border-yellow'>
          <Leftside />
          <Rightside />
        </div>
      </div>

    </div>
  )
}

export default Home




















