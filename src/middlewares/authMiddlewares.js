import tokenService from "../services/tokenService.js";
import User from "../models/User.js";
import Token from "../models/Token.js";
const authMiddlewares = async (req, res, next) => {
    console.log(">check");
    const userAuthorizationHeader = req.headers.authorization;
    if (!userAuthorizationHeader) {
        return res.json({"res":"auth error"});
    }
    const bearer = userAuthorizationHeader.split(" ")[1];
    let tokenIsOk;
    let currRtoken;
    let currUser;
    try {
        tokenIsOk = await tokenService.checkAccesToken(bearer);
        currRtoken = await Token.find({user: tokenIsOk.id});
        currUser = await User.findById(tokenIsOk.id);
    } catch (e) {
        console.log(e);
        return res.json({"res":"auth error2"});
    }
    const acces = (!!tokenIsOk && !!currRtoken.length && !!currUser);
    if (!acces) {
        return res.status(401).json({"res":"auth error2"});
    }
    const checkUser = await User.findById(tokenIsOk.id);
    if (!checkUser) {
        return res.status(401).json({"res":"auth error3"});
    }
    req.user=tokenIsOk;
    next();
};
export default authMiddlewares;