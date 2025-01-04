const mongoose = require("mongoose") ; 

const userSchema = new mongoose.Schema({
    userName : {
        type : String , 
        required : true , 
        trim : true , 
    },
    email : {
        type : String , 
        required : true , 
        trim : true , 
        // unique : true , 
        lowercase : true ,  
    },
    password : {
        type : String , 
        required : true , 
        trim : true , 
        minlength : 8 , 
    },
    confirmPassword : {
        type : String , 
        required : true , 
        trim : true ,    
    },
    verificationCode :{
        type :String
    },
    isVerified : {
        type :Boolean
    },
    verificationCodeTiming : {
        type : Date 
    }, 
    resetPasswordToken : {
        type  : String ,
    },
    resetPasswordVerificationExpiresIn : {
        type : Date
    }
})

const User = mongoose.model("User" , userSchema) ; 
module.exports = User ; 