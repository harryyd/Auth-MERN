import React, { useState} from 'react';

const Test = () => {
    // State
    // const [data , setData] = useState([]) ; 
    const [another  , setAnother ] = useState('') ; 

    const changeHandler = (e) =>{
        const {value} = e.target ; 
        console.log(value) ;
        setAnother('');
        setAnother(value) ; 
    }

    console.log(another) ; 

    return (
        <div>
            <input value={another} onChange={changeHandler} placeholder='text' /> 
            <p>submit</p>
        </div>
    );
};

export default Test;





