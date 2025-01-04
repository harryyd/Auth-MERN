import './App.css';
import Home from './component/Home';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import OtpCompo from './component/OtpCompo';
import Signup from './component/Signup';
import Login from './component/Login';
import ForgotPassord from './component/ForgotPassord';
import Profile from './component/Profile';
import Contact from './component/Contact';
import axios from 'axios';
import { ForgotpassordNewpassword } from './component/ForgotpassordNewpassword';
import useStore from './store/store';
import { useEffect } from 'react';
import Alternate from './component/Alternate';
import Confirm from './component/Confirm';
import WrongPage from './component/404'


const Protected = ({ children }) => {
  const { isLogin, loading } = useStore();

  if (loading && !isLogin) {
    return <h1 className='text-white'>loading</h1>
  }

  if (!isLogin && !loading) {
    return <Navigate to='/login' replace />;
  }
  return children;
}


const RedirectToHome = ({children}) =>{
    const {isLogin} = useStore() ; 

    if(isLogin){
      return <Navigate to='/' replace />
    }
  return children;

} 


function App() {

  const { setlogin, isLogin, setloading ,setUser} = useStore();
  // const [loading  , setLoading] = useState(true) ; 

  useEffect(() => {
    const checkAuth = async () => {
      // reques tto local host and check for hte authentication peocess and updtae isLogin in useStore
      try {
        const data = await axios.get("http://localhost:4000/api/test", { withCredentials: true });
        console.log("app js token set login", data);
        console.log("data inside token", data.data.token)

        if (data.data.token) {
          setlogin(true);
          setUser(data.data.user) ;
        }
        console.log("login at app ja ", isLogin);

      } catch (error) {
        console.log(error);
      }
      finally {
        setloading(false); // Set loading to false after the request completes
      }
    };
    checkAuth();
    // setloading(false) ;
    // console.log("app js loading " , loading) ; 

  }, [isLogin, setlogin, setloading , setUser])


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/otp" element={<OtpCompo />} />
          <Route path="/signup" element={<RedirectToHome> <Signup /> </RedirectToHome>} />
          <Route path="login" element={<RedirectToHome><Login /> </RedirectToHome>} />
          <Route path="confirm" element={<Confirm />} />
          <Route path="forgotPassword" element={<ForgotPassord />} />
          <Route path="profile" element={<Protected><Profile /> </Protected>} />
          <Route path="contact" element={<Contact />} />
          <Route path="/resetPassword/:token" element={<ForgotpassordNewpassword />} />
          <Route path="alternate/:id" element={<Alternate />} />
          <Route path="*" element={<WrongPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;


//// profile route must be saved in profile 