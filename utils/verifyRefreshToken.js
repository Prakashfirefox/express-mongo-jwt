const  {UserToken} =  require("../models/UserTokens");
const  jwt  =  require("jsonwebtoken");


const verifyRefreshToken = (refreshToken) => {
    console.log("verification");
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    return new Promise((resolve, reject) => {
        UserToken.findOne({ token: refreshToken })
            .exec() // Execute the query and return a Promise
            .then((doc) => {
                if (!doc) {
                    return reject({ error: true, message: "Invalid refresh token" });
                }
                jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
                    if (err) return reject({ error: true, message: "Invalid Refresh token" });
                    resolve({
                        tokenDetails,
                        error: false,
                        message: "Valid refresh token"
                    });
                });
            })
            .catch((err) => {
                reject({ error: true, message: err.message });
            });
    });

}


const verifyAccessToken = (accessToken) => {
    console.log("verification");
    const privateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
    return new Promise((resolve, reject) => {
                jwt.verify(accessToken, privateKey, (err, tokenDetails) => {
                    if (err) return reject({ errorA: true, message: "Invalid Access token" });
                        return resolve({ errorA: false, message: "Valid Access token" })
                });
    });

}

module.exports = {verifyRefreshToken, verifyAccessToken};
