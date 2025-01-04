const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const otp = require("../utils/otpGenrator")

// const passwordResetEmail = require("../utils/mails.js") ; 



const mail = async ({ res, email, otpdata }) => {
    try {

        console.log("running");

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: 'harshityd2912002@gmail.com',
                pass: 'usic ognc rmls zdtl'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        console.log("running 2");

        const mailOptions = {
            from: 'harshityd2912002@gmail.com', // Sender address
            to: email, // List of receivers
            subject: 'otp ', // Subject line
            text: `this is the otp we going to get ${otp}`, // Plain text body
            html: otpdata // HTML body
        };

        console.log("running 3");

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Error occurred: ' + error.message);
            }
            return console.log('Message sent: %s', info.messageId);
        });
    } catch (error) {
        return res.status(400).json({
            message: "problem in mailing"
        })
    }
}

const passwordResetEmail = async (email, requestUrl) => {
    try {

        console.log("running");

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: 'harshityd2912002@gmail.com',
                pass: 'usic ognc rmls zdtl'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        console.log("running 2");

        const mailOptions = {
            from: 'harshityd2912002@gmail.com', // Sender address
            to: email, // List of receivers
            subject: 'reset-password-mail ', // Subject line
            text: ``, // Plain text body
            html: " please click on the link to reset your password " + requestUrl
        };

        console.log("running 3");

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Error occurred: ' + error.message);
            }
            return console.log('Message sent: %s', info.messageId);
        });
    } catch (error) {
        return res.status(400).json({
            message: "problem in mailing"
        })
    }
}

const resetPasswordsuccessMail = async (companyEmail) => {
    try {

        console.log("running");

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: 'harshityd2912002@gmail.com',
                pass: 'usic ognc rmls zdtl'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        console.log("running 2");

        const mailOptions = {
            from: 'harshityd2912002@gmail.com', // Sender address
            to: companyEmail, // List of receivers
            subject: 'reset-password-success-mail ', // Subject line
            text: ``, // Plain text body
            html: "your password has been reset successfully"
        };

        console.log("running 3");

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Error occurred: ' + error.message);
            }
            return console.log('Message sent: %s', info.messageId);
        });
    } catch (error) {
        return res.status(400).json({
            message: "problem in mailing"
        })

    }
}

exports.Signup = async (req, res) => {

    try {
        const { userName , email , password ,confirmPassword } = req.body;
        if (!userName , !email , !password , !confirmPassword) {
            return res.status(400).json({
                message: "All fields are required" , 
            })
        }


        const user = await User.findOne({ email });
        if (user) return res.status(500).json({ message: "user already present" })



        //check the password and confirm passowrd are same  
        //although we are confirm it on frontend part also 
        if (password !== confirmPassword) return res.status(400).json({ message: "password and confirm password do not match" })

        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10); // no need to do this as both passsword are same 

        console.log("put") ;
        const data = {
            userName, email
        }
        //can we neglect creating the token and cookies here because i think this is uncessary 
        try {
            const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                sameSite: "Strict", // Adjust as necessary
            });
        } catch (error) {
            return res.json({
                messgae: "cookie error "
            })
        }

        const otpdata = await otp();
        const newUser = new User({
            userName ,  email ,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
            verificationCode: otpdata,
            isVerified: false,
            verificationCodeTiming: new Date(Date.now() + 15 * 60 * 1000) // 15 min

        });
        console.log("running")
        try {
            await newUser.save();
        } catch (error) {
            console.log(error);
        }

        console.log("running2")
        try {
            await mail({ res, email, otpdata });
        } catch (error) {
            console.log(error);
        }

        console.log("running3")

        return res.status(200).json({
            message: "done",
            data : newUser
        })


    } catch (error) {
        return res.status(500).json({
            message: "problem in signup",
            error :error
        })
    }
}

const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
};

// tested for  for 
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {

        if(!email || !password){
            return res.status(400).json({ success: false, message: "All fields are required while login" });
        }

        const user = await User.findOne({ email , isVerified : true });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials or either not signup " });
        }
        // console.log("this user is try to log" , user);

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            maxAge: 900000,
            httpOnly: true
        });

        // console.log("Set-Cookie:", res.getHeaders()['set-cookie']); 

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token: token,
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("Error in login", error);
        res.status(400).json({ success: false, message: error.message });
    }
};


exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
};

exports.verifyUser = async (req, res) => {

    try {
        const { code } = req.body;
        console.log(code);  


        console.log("problem occur here before ")


        const vuser = await User.findOne({
            //find based upon the verification code ; 
            verificationCode: code,
            //and check wheater the code timing is good
            verificationCodeTiming: { $gt: Date.now() },
        })

        console.log("problem occur here after ")

        if (!vuser) {
            return res.status(400).json({
                message: "user not present"
            })
        }

        vuser.isVerified = true,
        vuser.verificationCode = undefined;
        vuser.verificationCodeTiming = undefined;
        await vuser.save();

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: vuser
        });
    } catch (error) {
        console.log("this erorr occur ", error);
    }


    //send verfication mail; 
    //what if user provide different - different email then we can use rate limiter to prevent user providing 
    //more than 3 signup request ; 

};

exports.checkRegistererdEmail = async (req, res) => {
    try {
        const { email } = req.body;
        // const email = companyEmail ;

        if (!email) {
            return res.status(400).json({
                message: "please enter you registered email"
            })
        }

        const user = await User.findOne({ email , isVerified : true });
        if (!user) {
            return res.status(400).json({
                message: "user not present"
            })
        }
        const resetToken = await otp();

        user.resetPasswordToken = resetToken;
        user.resetPasswordVerificationExpiresIn = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        await user.save();
        const requestUrl = `${process.env.CLIENT_URL}resetPassword/${resetToken}`
        await passwordResetEmail(email, requestUrl) // this has to be implemented 

        return res.status(200).json({
            message: "forgot mail send sucess"
        })

    } catch (error) {
        return res.status(400).json({
            message: "problem in forgot password",
            error: error.message
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        
        console.log("this run isnide reset password" , req.params);
        const  { token } = req.params;
        const { password ,confirmPassword} = req.body;

        console.log("the token is " , token);

        if (!token) {
            return res.status(400).json({
                message: "error , Token not present in reset token",
            })
        }

        if(!password || !confirmPassword){
            return res.status(400).json({
                message: "error , please enter all fields",
            })
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                message: "password and confirm password do not match"
            })
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordVerificationExpiresIn: { $gt: Date.now() }
        });


        if (!user) {
            return res.json(400).json({
                message: "user not present accrding to token in db in rest password"
            })
        }

        console.log("this is under reset password" , user);

        const hashedPassword = await bcrypt.hash(password, 10);
        
        // user.password = undefined ;
        user.password = hashedPassword;
        user.confirmPassword =hashedPassword;
        user.resetPasswordVerificationExpiresIn = undefined;
        user.resetPasswordToken = undefined;

        await user.save();


        await resetPasswordsuccessMail(user.email);


        return res.status(200).json({
            message: "rest password done successfully"
        })

    } catch (error) {   
        return res.status(400).json({
            message: "problem in reset password"
        })
    }
}



exports.test = async(req, res) => {
    try {
		const user = await User.findById(req.userId).select("-password");
        const token  = req.token;
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user , token });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};




exports.alternate = async(req ,res) => {
    const {id} = req.params;  

    console.log(id) ; 
    console.log("this is params " , req.params) ;
    
    return res.status(200).json({
        id : id
    })
}
// exports.test = (req, res) => {
//     try {

//         res.cookie("test" , "randi ke jaam " ,{ maxAge: 900000, secure: false })
//         return res.status(200).json({
//             message: "this is test",
//             data : "hello zanka no taachi "
//         })

//     } catch (error) {
//         return res.status(500).json({ message: "problem in test", error: error.message })
//     }
// }




