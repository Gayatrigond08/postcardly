import express from "express";

import {
  createPostcard,
  getUserPostcards,
  getPostcardById,
  updatePostcard,
  deletePostcard,
  markPostcardDownloaded,
} from "../controllers/postcardController.js";

const router = express.Router();

router.post("/", createPostcard);

// Get all postcards of a user
router.get("/user/:userId", getUserPostcards);

// Mark postcard as downloaded
router.post("/:id/download", markPostcardDownloaded);

// Update an existing postcard
router.put("/:id", updatePostcard);

// Delete a postcard
router.delete("/:id", deletePostcard);

// Get one specific postcard
router.get("/:id", getPostcardById);

export default router;