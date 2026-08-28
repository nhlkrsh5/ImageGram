import expess from "express";
import multer from "multer";
import { isAdmin, isAuthenticated } from "../middleware/AuthMiddleware.js";
import { AllUsers, BanAPost, DeleteUser, GetAllotsOfUser, getProfile,userRegistration, UserSignIN } from "../controller/userController.js";
const router = expess.Router();

const upload = multer();

router.use(expess.json());
router.use(expess.urlencoded({extended: true}));
router.get("/profile",isAuthenticated,getProfile);

router.post("/signup",upload.none(),userRegistration);
router.post("/signin",upload.none(),UserSignIN);
router.get("/post",isAuthenticated,GetAllotsOfUser)
router.get("/Allusers",AllUsers);
router.delete("/:id",isAuthenticated,isAdmin,DeleteUser); //Delete a user by admin
router.put("/:id",isAuthenticated,isAdmin,BanAPost); //Ban a post from admin

export default router;