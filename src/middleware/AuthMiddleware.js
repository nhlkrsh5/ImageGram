import { userExist } from "../service/UserService.js";
import { verifyJWTTocken } from "../utils/jwt.js";

export const isAuthenticated = async(req,res,next)=>{

    const tocken = req.headers["x-access-tocken"];
    //console.log("Middleware header:",tocken);
    //console.log("Midleware:",req);

    if(!tocken){
        return res.status(401).json({
            success: false,
            messeage: 'Tocken required'
        });
    }

    try {
        const response = verifyJWTTocken(tocken);
        const doesUserExist = await userExist(response.email)
        console.log("Response",response);
        
        if (!doesUserExist) {
            return res.status(401).json({
                success: false,
                messeage: 'User not found'
            });
        }
       req.user = response;
       //console.log("User:",req.user);
       
       next();
    } catch (error) {
        console.log("Error",error);
        return res.status(401).json({
                success: false,
                messeage: 'Incalid tocken'
            });
    }
    
} 

export const isAdmin = (req,res,next)=>{
    if(req.user.role != "admin"){
        res.status(401).json({
            success: false,
            messeage: "Only admin can update a post"
        });
    }else{
        next();
    }
}
