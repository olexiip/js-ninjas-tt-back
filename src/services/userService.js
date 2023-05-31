import User from "../models/User.js";
import Role from "../models/Roles.js";
import Token from "../models/Token.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import tokenService from "./tokenService.js";
import UserDTO from "../dto/userDTO.js";
import mailService from "./mailService.js";

class UserService {
    constructor(logger) {
        this.log = logger;
      }
async register(req, res) {
   console.log(`>>> reg service request`);
    const candidate = await User.findOne({email: req.body.userEmail});
    if (candidate) {
       console.log(`>>> reg service: email already in use`);
        return ({"res": "email already in use"});
    };
    const hashedPass = bcrypt.hashSync(req.body.userPass, 7); 
    const newUserRole = await Role.findOne({value: "USER"});
    const actLink = uuidv4();
    const newUser = new User({
        email:req.body.userEmail, 
        password: hashedPass, 
        actLink, 
        roles:newUserRole.value,
        userName: req.body.userName,
        userSurname: req.body.userSurname,
        dob: req.body.userDateOfBirth,
        });
    const userDto = new UserDTO(newUser);
    newUser.save();
   console.log(`user sercice> user created`);
    await mailService.sendActMail(req.body.userEmail, `${process.env.URL}/auth/activate/${actLink}`);
   console.log(`>>> mail sended`);
    newUser.save();
    return {user: userDto};
    }


async login(req, res) {
   console.log(`user sercice > login request`);
    const loginUser = await User.findOne({email: req.body.email}).select("+password");
   
    if (!loginUser) {
       console.log(`user sercice > login not finded id DB`);
        return {"res": "bad login data"};
    }
   console.log(`user sercice > login data`); //: login: ${req.body.email} pass: ${loginUser.password}`);
    let validPass;
    try {
        //console.log(req.body.userpass);
        validPass = await bcrypt.compareSync(req.body.userpass, loginUser.password);
       console.log(`user sercice > chekicng pass ok`)
    } catch (e) {
       console.log(`user sercice > chekicng pass error`);
        return {"res": "bad login data"};
    }
    if (!validPass) {
       console.log(`user sercice > login login bad bass`);
        return {"res": "bad pass"};
    }
    await tokenService.delTokenbyID(loginUser._id);
    const userDto = new UserDTO(loginUser);
    const tokens = await tokenService.generateToken({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    //this.log.info(`user sercice > ${loginUser}`);
    await loginUser.save();
   console.log(`user sercice > login ok`);
    return {...tokens, user: userDto};      
}

async activate(actLink) {
   console.log(`userService>activate`);
    const currUser = await User.findOne({actLink});
    if (!currUser) {
       console.log(`userService > activate> act failed`);
        return "notActivated"
    }
    currUser.isActivated = true;
    await currUser.save();
    //this.log.info(`>>> user.service act done`);
    return "activated"
}   
async logout(userID) {
   console.log(`userService>logout`);
    const tokenIsDeleted = await tokenService.delTokenbyID(userID);
    //console.log("tokenIsDeleted");
    //console.log(tokenIsDeleted);
    return tokenIsDeleted;
}
async refresh(refreshToken) {
   console.log(`userService > refresh`);
    //this.log.info(`userService > refreshToken: ${refreshToken}`);
    const refreshTokenExist = await Token.findOne({refreshToken});
    const refreshTokenIsOK = await tokenService.checkRefreshToken(refreshToken);
    if (!(refreshTokenIsOK && refreshTokenExist)) {
       console.log(`>>> bad refresh, tokesns are bad`);
        return null;
    }
    const userData = await User.findById(refreshTokenIsOK.id);
    if (!userData?.id){
        return null;
    }
    await tokenService.delTokenbyID(userData.id);
    const userDto = new UserDTO(userData);
    const tokens = await tokenService.generateToken({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    try {
        await userData.save();
    } catch (e) {
        console.log("---token service error refresh token saving ---> ");
        console.log(e);
        return null;
    }
   console.log(`>>> refresh login ok`);
    return {...tokens,user: userDto};      
}

}

const userService = new UserService();
export default userService;