const {UserToken} =  require("../models/UserTokens");
const jwt =  require("jsonwebtoken");
const { refreshTokenValidation } =  require("../utils/validationSchema");
const {verifyRefreshToken} = require("../utils/verifyRefreshToken");

async function getAccessToken (req, res){
    const {error}  =  refreshTokenValidation(req.body);
    if(error)
            return res.status(400)
                    .json({error:true, message: error.details[0].message})
    verifyRefreshToken(req.body.refreshToken)
    .then((tokenDetails)=>{
        const payload = {_id: tokenDetails._id,roles: tokenDetails.roles}
        const accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_PRIVATE_KEY,
                {expiresIn  : "14m"}
        );
        res.status(200).json({error: false, data: {
            accessToken: accessToken
        }, message: "Access token created successfully"})

    })
    .catch((err)=>{
        console.log(err)
        res.status(400).json({error:true, message:err})
    });

}

module.exports={ getAccessToken};