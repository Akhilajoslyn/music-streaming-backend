const express = require("express");

const upload = require("../middleware/upload.middleware");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const router = express.Router();

router.post(
    "/upload-image",
    upload.single("image"),
    async (req, res) => {
        try {
            const result =
                await uploadToCloudinary(
                    req.file.buffer,
                    "music-streaming/artists",
                    "image"
                );

            return res.status(200).json({
                success: true,
                imageUrl: result.secure_url,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
);

module.exports = router;