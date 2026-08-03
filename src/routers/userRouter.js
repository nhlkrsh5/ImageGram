import expess from "express";
import multer from "multer";
import { AllUsers, getProfile,userRegistration, UserSignIN } from "../controller/userController.js";
const router = expess.Router();

const upload = multer();

router.use(expess.json());
router.use(expess.urlencoded({extended: true}));
router.get("/profile",getProfile);

router.post("/signup",upload.none(),userRegistration);
router.post("/signin",upload.none(),UserSignIN);
router.get("/Allusers",AllUsers);

export default router;