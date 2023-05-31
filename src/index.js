import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import itemsRouter from "./routes/itemsRouter.js";
import authRouters from "./routes/authRouter.js";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorMiddlewares.js";
import mongoose from "mongoose"
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use("/items", itemsRouter);
app.use("/auth", authRouters);

const __dirname = path.resolve();
console.log("Hello World! backend started");

function envsChecker() {
    console.log('envsChecker:');
    let all_is_ok = true;
    const list = [
        "MY_PORT",
        "DB_CON",
        "JWT_S",
        "JWT_R_S",
        "SMTP_HOST",
        "SMTP_PORT",
        "SMTP_USER",
        "SMTP_PASS"
    ];
    const env_obj  = process.env;
    list.forEach(element => {
        if (!env_obj[element]) {
            console.log(`   pls set  ${element} to .env file`);
            all_is_ok = false;
        }
    });
    if (!all_is_ok) {
        console.log(`need env, exit process`)
        process.exit(-1);
    }

    console.log(`envs ok`)
    return all_is_ok;
}

envsChecker();


const PORT = process.env.PORT?? 3001;
const DB_CON = process.env.DB_CON;


app.use(errorHandler);




app.get("/", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "static", "index.html"));
});

app.listen(PORT, async ()=> {
    
    console.log(`Server started with port ${PORT}...`);
    try {
        await mongoose.connect(DB_CON);
        console.log("DB ok")
    } catch (e) {
        console.log(e);
    }


});