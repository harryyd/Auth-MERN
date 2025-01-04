const express = require("express") ; 
const router = express.Router() ; 
const {Signup,verifyUser , login ,logout , checkRegistererdEmail , resetPassword , test ,alternate} = require("../controllers/authController") ; 
const {verifytoken} = require("../middleware/verifyToken.js") ;


router.post("/signup" , Signup) ; //works fine
router.post("/verifyOtp" , verifyUser) ; //works fine 
router.post("/login" , login) ; //works fine
router.get("/logout" , logout) ; //works fine   

router.post("/resetMail" , checkRegistererdEmail); //works fine
router.post("/resetpassword/:token" , resetPassword ); 


//for access checking  
router.get("/test",verifytoken, test) ;


module.exports = router ; 
