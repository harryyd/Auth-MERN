const { customOtpGen } = require('otp-gen-agent');
// const otpGenerator = require('otp-generator') ; 

const otp = async() =>{
    try{
        const otp = await customOtpGen({length: 4});
        return otp ;  
    }catch(error){
       console.log(error) ; 
    }
   
}

module.exports = otp ; 