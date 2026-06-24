const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (
    fileBuffer,
    folder,
    resourceType = "image"
) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    folder,
                    resource_type: resourceType,
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            )
            .end(fileBuffer);
    });
};

module.exports = uploadToCloudinary;