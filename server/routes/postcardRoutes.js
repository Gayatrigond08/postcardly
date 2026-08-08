import express from "express";

import {
  createPostcard,
  getUserPostcards,
  getPostcardById,
  updatePostcard,
  deletePostcard,
  markPostcardDownloaded,
} from "../controllers/postcardController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All postcard routes require login
router.use(authMiddleware);

// Create postcard / draft
router.post("/", createPostcard);

// Get user's postcards
router.get("/user", getUserPostcards);

// Mark postcard as downloaded
router.post("/:id/download", markPostcardDownloaded);

// Update postcard
router.put("/:id", updatePostcard);

// Delete postcard
router.delete("/:id", deletePostcard);

// Get one postcard
router.get("/:id", getPostcardById);

export default router;