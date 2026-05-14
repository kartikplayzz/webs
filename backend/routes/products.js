import express from "express";
import multer from "multer";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from "../controllers/productController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 6 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    if (!file.mimetype.startsWith("image/")) {
      return callback(new Error("Only image uploads are allowed."));
    }
    return callback(null, true);
  }
});

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", requireAdmin, upload.single("image"), createProduct);
router.put("/:id", requireAdmin, upload.single("image"), updateProduct);
router.delete("/:id", requireAdmin, deleteProduct);

export default router;
