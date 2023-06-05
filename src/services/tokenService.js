import jwt from "jsonwebtoken";
import Token from "../models/Token.js";


class TokenService {
    generateToken(payload){
        const accesToken = jwt.sign(payload, process.env.JWT_S, {expiresIn: "5m"});
        const refreshToken = jwt.sign(payload, process.env.JWT_R_S, {expiresIn: "15d"});
        return {accesToken, refreshToken};
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId})
        if (tokenData) {
            await this.delTokenbyID(userId);
        }
        let  token ; 
        try {
            token = await Token.create({user: userId, refreshToken});
        } catch (e) {
            console.log(e);
        }
        return token;
    }
    async delToken(refreshToken) {
        const isDelToken = await Token.deleteOne({refreshToken});
    }
    async delTokenbyID(id) {
        const isDelToken = await Token.deleteMany({user: id});
        return isDelToken;
    }
    async checkAccesToken(accesToken) {
        try {
            const isOkToken = await jwt.verify(accesToken, process.env.JWT_S);
        return isOkToken;
        } catch (e) {
           console.log(e);
            return null;
        }
    }
    async checkRefreshToken(refreshToken) {
        try {
            const isOkToken = await jwt.verify(refreshToken, process.env.JWT_R_S);
            return isOkToken;
        } catch (e) {
            return null;
        }
    }

}
const tokenService = new TokenService();
export default tokenService;