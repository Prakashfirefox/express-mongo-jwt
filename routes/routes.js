const { Router} =  require("express");
const {signUp, login, logout} = require ("../controllers/authController");
const { getAccessToken } = require("../controllers/refreshTokenController");
const router = Router();

//Routes  
router.post("/signUp", signUp);
router.post("/login", login);
router.delete("/logout", logout);
router.post("/getAccessToken",getAccessToken);

module.exports =  {router};


