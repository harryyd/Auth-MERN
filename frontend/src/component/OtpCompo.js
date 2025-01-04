/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const OtpInput = ({ length = 4, onOtpSubmit = () => { } }) => {


  const navigate = useNavigate() ; 
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    if (!inputRefs.current[index].disabled) {
      inputRefs.current[index].setSelectionRange(1, 1);
    }
    // inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const bankai = async (event) => {
    event.preventDefault();
    try {
      const combinedOtp = otp.join("");
      // const normal = await axios.get('http://www.localhost:4000/api/test') ;
      const normal = await axios.post('http://localhost:4000/api/verifyOtp', {code : combinedOtp}) ; 
      const response = normal.data ; 
      console.log(response); //
      //one popup 
      // setOtp("") ; 
      navigate("/home")
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (  
    <div>

      <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div class="flex flex-col items-center justify-center text-center space-y-2">
              <div class="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div class="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email</p>
                
              </div>
            </div>
            <form>
            <button onClick={bankai}>testing</button>
            </form>

            <div>
              <form onSubmit={bankai}>
                <div class="flex flex-col space-y-16">
                  <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">

                    {otp.map((value, index) => {
                      return (
                        <>
                          <div class="w-16 h-16 ">
                            <input
                              key={index}
                              type="text"
                              ref={(input) => (inputRefs.current[index] = input)}
                              value={value}
                              onChange={(e) => handleChange(index, e)}
                              onClick={() => handleClick(index)}
                              onKeyDown={(e) => handleKeyDown(index, e)}
                              className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 no-spinner"
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>

                  <div class="flex flex-col space-y-5">
                    <div>
                      <button class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                        Verify Account
                      </button>
                    </div>

                    <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p> <a class="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OtpInput;