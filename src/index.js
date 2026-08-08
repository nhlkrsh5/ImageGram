import express from "express";
import DBConnection from "./config/DBconfig.js";
import dotenv from "dotenv";
import { multerUpload } from "./config/multerConfig.js";
import apiRouter from "./routers/apiRouter.js"
import { isAuthenticated } from "./middleware/AuthMiddleware.js";
import multer from "multer";
import cors from "cors";
import { swaggerSpace,swagger_ui} from "./APIdocs/swagger.js";

dotenv.config();

const app = express();
const upload = multer();
app.use(express.text());
app.use(express.urlencoded({extended: true}));
const PORT = 3000;
//console.log(process.env.DB_URL);
app.use(cors({
  origin: '*', // or '*' for development
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type','x-access-tocken','Authorization'],
  credentials: true
}));
app.use("/api",apiRouter);

app.use("/api-docs", swagger_ui.serve, swagger_ui.setup(swaggerSpace));

app.get("/",upload.none(),isAuthenticated,(req,res)=>{
    return res.send("Home page");
});

app.get("/ping",(req,res)=>{

    console.log("ping User:",req.user);
    return res.json({messege: "Pong"});
    
});

app.listen(PORT,()=>{
    console.log("index.js",process.env.DB_URL);
    console.log("Key",process.env.ACCESS_KEY_ID);
    DBConnection();
    console.log(`Running on ${PORT}`);
    
});