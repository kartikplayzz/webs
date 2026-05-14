import express from "express";
import { loginAdmin } from "../controllers/adminController.js";
import { listInquiries } from "../controllers/contactController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/inquiries", requireAdmin, listInquiries);

export default router;
