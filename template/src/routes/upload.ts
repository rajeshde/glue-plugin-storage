import { Router } from "express";
const multer = require("multer");

// Others
import Controller from "../controllers/upload/handlers";

const router = Router();

/**
 * Authentication routes
 */
const upload = multer();

router.post("/upload", upload.single("file"), Controller.upload);

export default router;
