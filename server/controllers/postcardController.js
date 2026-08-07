import Postcard from "../models/Postcard.js";

// Create a new postcard
export const createPostcard = async (req, res) => {
  try {
    const { title, message, template, user } = req.body;

    const postcard = await Postcard.create({
      title,
      message,
      template,
      user,
    });

    res.status(201).json({
      message: "Postcard created successfully",
      postcard,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all postcards of a user
export const getUserPostcards = async (req, res) => {
  try {
    const { userId } = req.params;

    const postcards = await Postcard.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(postcards);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};