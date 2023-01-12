import { Router } from "express";
const multer = require("multer");

// Others
import Controller from "../controllers/storage/handlers";

const router = Router();

/**
 * Authentication routes
 */
const upload = multer();

router.post("/upload", upload.single("file"), Controller.upload);
router.get("/file/:path", Controller.get);

export default router;
