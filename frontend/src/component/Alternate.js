import axios from "axios"
const Alternate = () => {

    const clickHAndler = async() =>{
        await axios.get("http://localhost:4000/api/alternate" , {withCredentials: true})
    }

    return (
        <div>
            <p className="text-white"> alternate</p> 
            <button onClick={clickHAndler}> click me </button>
        </div>
    )
}   

export default Alternate