const  joi = require("joi");
const  passwordComplexity =  require("joi-password-complexity");

const signUpBodyValidation = (body)=>{

    const schema = joi.object({
         userName: joi.string().required().label("User Name"),
         email : joi.string().required().label("Email"),
         password: joi.string().required().label("Password")
    })
    return schema.validate(body);
}

const logInBodyValidation = (body) =>{
    const schema =joi.object({
        email:joi.string().required().label("Email"),
        password:joi.string().required().label("Password")
    })
    return schema.validate(body);
}

const refreshTokenValidation = (body) =>{
    const schema = joi.object({
        refreshToken: joi.string().required().label("Refresh Token")
    })
    return schema.validate(body);
}

module.exports={
    signUpBodyValidation,
    logInBodyValidation,
    refreshTokenValidation
}