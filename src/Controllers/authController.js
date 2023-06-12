
import userService from "../services/userService.js";

class AuthController {

    async login(req, res) {
        const userData = await userService.login(req, res);
        return res.json(userData);    
    }

    async reg(req, res) {
        console.log(`>>> reg request`);
        console.log(req.body)
        const userData = await userService.register(req, res);
        console.log(userData);
        if (!userData?.user) {
            return res.status(400).json({"res": "reg error"});
        }
        console.log(userData);
        //console.log("ok");
        return res.json(userData);
    }

    async check(req, res) {
        return res.json({res:"ok"});
    }

    async refresh(req, res) {

        if (!req.body.refreshToken) {
            res.json({"res": "user does not have a token"});
        }   
        const checkRefreshToken = await userService.refresh(req.body.refreshToken);
        if (checkRefreshToken) {
            console.log(`AuthController > refresh ok`);
            return res.json(checkRefreshToken);
        }
        res.json({"res": "refresh bad"});
        return res.status(400);    
        
    }
    async activate(req, res) {
        console.log(`>>> activate request`);
        const actLink = req.params.link;
        console.log(`>>> actLink:`);
        console.log(actLink);
        const isActivated = await userService.activate(actLink);
        if (isActivated==="activated") {
            res.redirect(`http://${process.env.FRONT}`);
        } else if (isActivated==="notActivated") {
            res.json({"res":"bad act link"});
        }
    }
    async logout(req, res) {
        console.log(`>>> logout`);
        console.log(req.user.id);
        const result = await userService.logout(req.user.id);
        res.json({"res": result});
    }

}

const authController = new AuthController();
export default authController;