
import userService from "../services/userService.js";

class AuthController {
    // constructor(logger) {
    //     this.log = logger;
    // }

    async login(req, res) {
        console.log(`>>> login request`);
        const userData = await userService.login(req, res);
        return res.json(userData);    
    }

    async reg(req, res) {
        console.log(`>>> reg request`);
        const userData = await userService.register(req, res);
        console.log(userData);
        if (!userData?.user) {
            return res.status(400).json({"res": "reg error"});
        }
        return res.json(userData);
    }

    async check(req, res) {
        console.log(`>>> check request`);
        return res.json({res:"ok"});
    }

    async refresh(req, res) {
        console.log(`AuthController > refresh request`);
        //console.log(req.body);
        this.log.info(`AuthController > refreshToken: ${req.body.refreshToken}`);
        if (!req.body.refreshToken) {
            res.json({"res": "user does not have a token"});
        }   
        const checkRefreshToken = await userService.refresh(req.body.refreshToken);
        if (checkRefreshToken) {
            this.log.info(`AuthController > refresh ok`);
            return res.json(checkRefreshToken);
        }
        return res.status(400).json({"res": "refresh bad"});    
        
    }
    async activate(req, res) {
        console.log(`>>> activate request`);
        const actLink = req.params.link;
        this.log.info(`>>> actLink:`);
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