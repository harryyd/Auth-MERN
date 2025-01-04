import { useNavigate } from "react-router-dom"; 

const Confirm = () =>{
    const navigate = useNavigate();
    const clickHandler =() =>{
        navigate("/")
    }
    return (
        <div>
            <p> confirm </p>
            <button onClick={clickHandler}> click me </button>
        </div>
    )
} 

export default Confirm