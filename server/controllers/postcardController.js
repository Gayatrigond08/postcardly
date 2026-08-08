import Postcard from "../models/Postcard.js";

// Create a new draft/postcard
export const createPostcard = async (req, res) => {
  try {
    const {
      title,
      to,
      message,
      from,
      template,
      status,
    } = req.body;

    const postcard = await Postcard.create({
      title,
      to,
      message,
      from,
      template,
      user: req.user.id,
      status: status || "draft",
    });

    res.status(201).json({
      message:
        postcard.status === "created"
          ? "Postcard created successfully"
          : "Draft saved successfully",
      postcard,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all postcards of logged-in user
export const getUserPostcards = async (req, res) => {
  try {
    const postcards = await Postcard.find({
      user: req.user.id,
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

// Get one specific postcard
export const getPostcardById = async (req, res) => {
  try {
    const { id } = req.params;

    const postcard = await Postcard.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!postcard) {
      return res.status(404).json({
        message: "Postcard not found",
      });
    }

    res.status(200).json(postcard);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update a postcard
export const updatePostcard = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      to,
      message,
      from,
      template,
      status,
    } = req.body;

    const postcard = await Postcard.findOneAndUpdate(
      {
        _id: id,
        user: req.user.id,
      },
      {
        title,
        to,
        message,
        from,
        template,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!postcard) {
      return res.status(404).json({
        message: "Postcard not found",
      });
    }

    res.status(200).json({
      message:
        postcard.status === "created"
          ? "Postcard updated successfully"
          : "Draft updated successfully",
      postcard,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete a postcard
export const deletePostcard = async (req, res) => {
  try {
    const { id } = req.params;

    const postcard = await Postcard.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!postcard) {
      return res.status(404).json({
        message: "Postcard not found",
      });
    }

    res.status(200).json({
      message: "Postcard deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Mark a postcard as downloaded
export const markPostcardDownloaded = async (req, res) => {
  try {
    const { id } = req.params;

    const postcard = await Postcard.findOneAndUpdate(
      {
        _id: id,
        user: req.user.id,
      },
      {
        downloadedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!postcard) {
      return res.status(404).json({
        message: "Postcard not found",
      });
    }

    res.status(200).json({
      message: "Download recorded successfully",
      postcard,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};