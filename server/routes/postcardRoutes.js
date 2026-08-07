import express from "express";
import {
  createPostcard,
  getUserPostcards,
} from "../controllers/postcardController.js";
const router = express.Router();

router.post("/", createPostcard);
router.get("/:userId", getUserPostcards);

export default router;