const  Jwt  = require("jsonwebtoken");
const  {UserToken} = require("../models/UserTokens");

const genrateTokens = async (user) => {
    try{
        const payload = {_id:user._id, roles: user.roles};
        const accessToken = Jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            {expiresIn:"1m"}
        );
        const refreshToken = Jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            {expiresIn:"30d"}
        );
        const token = await UserToken.findOneAndDelete({userId:user._id});
        await new UserToken({userId:user._id,token:refreshToken}).save();
        return Promise.resolve({accessToken,refreshToken});

    }
    catch(err){
        return Promise.reject(err);
    }
};

module.exports= {genrateTokens};