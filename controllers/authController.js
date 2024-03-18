const  {Users} = require("../models/Users");
const  bcrypt =  require("bcrypt");
const  { signUpBodyValidation, 
        logInBodyValidation, 
        refreshTokenValidation } = require ("../utils/validationSchema");
const  {genrateTokens} = require("../utils/genrateTokens");
const  {verifyRefreshToken, verifyAccessToken} = require("../utils/verifyRefreshToken");
const  {UserToken} =  require("../models/UserTokens");


//signUp
async function signUp(req, res){
    try{
        const { error } = signUpBodyValidation(req.body);
        if(error)
            return res.status(400).json({error: true, message:error.details[0].message});
        const user = await Users.findOne({email: req.body.email});
        if(user)
            return res.status(400).json({error:true, message:"User with given email id already exist"})
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await new Users({...req.body, password: hashPassword}).save();
        return res.status(200)
                   .json({error:false, message:"Account created successfully"})

    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:true, message: " Internal server error"})
    }
}


//login
async function login(req, res){
    try {
        const {error} = logInBodyValidation(req.body)
        if(error)
            return res.status(400)
                        .json({error:true, message:error.details[0].message})
        const user = await  Users.findOne({email:req.body.email})
        if(!user)
            return res.staus(400)
                        .json({error:true, message: "Invalid email or password"})
        const verifyPassword =  await bcrypt.compare(req.body.password, user.password);
        if(!verifyPassword)
            return res.status(400)
                        .json({error:true, message:"Invalid email or password"})
        const { refreshToken, accessToken} = await genrateTokens(user);
        return res.status(200)
                .json({error:false, 
                    message:"logged in successful",
                    data:{
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
            })
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({error:true, message:"Internal server error"})
    }
}


//logout
async function logout(req, res){
    try {
        
        const { errorA } = await verifyAccessToken(req.body.accessToken); // Await the promise
        if (errorA) {
            return res.status(400).json({ error: true, message: errorA.details[0].message });
        }
        return res.status(200).json({message: "test"});

        const { error } = await verifyRefreshToken(req.body.refreshToken); // Await the promise
        if (error) {
            return res.status(400).json({ error: true, message: error.details[0].message });
        }
        
        const token = await UserToken.findOneAndDelete({ token: req.body.refreshToken }); // Await the promise
        if (!token) {
            return res.status(200).json({ error: false, message: "Logged out successfully" });
        }
        
        return res.status(200).json({ error: false, message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
}




module.exports={signUp, login, logout};