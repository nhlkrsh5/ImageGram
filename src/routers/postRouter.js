import express from "express";
import { multerUpload } from "../config/multerConfig.js";
import { AllData,post,CommentOnPost,createPost,DeletePostController,UpdatePostController, LikesOnPost, LikesOnComments } from "../controller/postController.js";
import { validator } from "../validators/zodValidator.js";
import { zodPostSchema } from "../validators/zodPostSchema.js";
import { isAuthenticated,isAdmin } from "../middleware/AuthMiddleware.js";
import multer from "multer";
const router = express.Router();

const upload = multer();
router.use(express.json());
router.use(express.text());
router.use(express.urlencoded({extended: true}));

router.get("/",AllData);

//Fetch signle post
router.get("/:id",post);

//Upload image
router.post("/",isAuthenticated, multerUpload.single("image"),createPost);

//Delete post
router.delete("/:id",isAuthenticated,DeletePostController);

//Update post
//router.put("/:id",isAuthenticated,multerUpload.single("image"),UpdatePostController);
router.put("/:id",isAuthenticated,isAdmin,multerUpload.single("image"),UpdatePostController);

//Like on post
router.post("/:postId/likes",isAuthenticated,LikesOnPost);

//comment of post
router.post("/:postId/comment",isAuthenticated,upload.none(),CommentOnPost);

router.post("/:postId/comment/:commentId/like",isAuthenticated,LikesOnComments);

export default router;
