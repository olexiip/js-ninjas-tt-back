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
    const candidate = await User.findOne({email: req.body.userEmail});
    if (candidate) {
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
    await mailService.sendActMail(req.body.userEmail, `${process.env.URL}/auth/activate/${actLink}`);
    newUser.save();
    return {user: userDto};
    }


async login(req, res) {
    const loginUser = await User.findOne({email: req.body.email}).select("+password");
    if (!loginUser) {
        return {"res": "bad login data"};
    }
    let validPass;
    try {
        validPass = await bcrypt.compareSync(req.body.userpass, loginUser.password);
    } catch (e) {
        return {"res": "bad login data"};
    }
    if (!validPass) {
        return {"res": "bad pass"};
    }
    await tokenService.delTokenbyID(loginUser._id);
    const userDto = new UserDTO(loginUser);
    const tokens = await tokenService.generateToken({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    //this.log.info(`user sercice > ${loginUser}`);
    await loginUser.save();
    return {...tokens, user: userDto};      
}

async activate(actLink) {
    const currUser = await User.findOne({actLink});
    if (!currUser) {
        return "notActivated"
    }
    currUser.isActivated = true;
    await currUser.save();
    return "activated"
}   
async logout(userID) {
    const tokenIsDeleted = await tokenService.delTokenbyID(userID);
    return tokenIsDeleted;
}
async refresh(refreshToken) {
    const refreshTokenExist = await Token.findOne({refreshToken});
    const refreshTokenIsOK = await tokenService.checkRefreshToken(refreshToken);
    if (!(refreshTokenIsOK && refreshTokenExist)) {
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
    return {...tokens,user: userDto};      
}

}

const userService = new UserService();
export default userService;