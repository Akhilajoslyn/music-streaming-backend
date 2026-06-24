const Artist = require("../models/Artist");
const ApiError = require("../utils/ApiError");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

/*
====================================
Create Artist
====================================
*/
const createArtist = async (artistData) => {

    const existingArtist =
        await Artist.findOne({
            name: artistData.name,
        });

    if (existingArtist) {
        throw new ApiError(
            409,
            "Artist already exists"
        );
    }

    let imageUrl = "";

    if (artistData.imageBuffer) {

        const uploadedImage =
            await uploadToCloudinary(
                artistData.imageBuffer,
                "music-streaming/artists",
                "image"
            );

        imageUrl =
            uploadedImage.secure_url;
    }

    return await Artist.create({
        name: artistData.name,
        bio: artistData.bio,
        image: imageUrl,
        genres: artistData.genres || [],
    });
};

/*
====================================
Get All Artists
====================================
*/
const getArtists = async () => {

    return await Artist.find()
        .populate("genres");
};

/*
====================================
Get Artist By ID
====================================
*/
const getArtistById = async (
    artistId
) => {

    const artist =
        await Artist.findById(
            artistId
        ).populate("genres");

    if (!artist) {
        throw new ApiError(
            404,
            "Artist Not Found"
        );
    }

    return artist;
};

/*
====================================
Update Artist
====================================
*/
const updateArtist = async (
    artistId,
    artistData
) => {

    const artist =
        await Artist.findById(
            artistId
        );

    if (!artist) {
        throw new ApiError(
            404,
            "Artist Not Found"
        );
    }

    if (artistData.imageBuffer) {

        const uploadedImage =
            await uploadToCloudinary(
                artistData.imageBuffer,
                "music-streaming/artists",
                "image"
            );

        artist.image =
            uploadedImage.secure_url;
    }

    if (artistData.name) {
        artist.name =
            artistData.name;
    }

    if (artistData.bio) {
        artist.bio =
            artistData.bio;
    }

    if (artistData.genres) {
        artist.genres =
            artistData.genres;
    }

    await artist.save();

    return artist;
};

/*
====================================
Delete Artist
====================================
*/
const deleteArtist = async (
    artistId
) => {

    const artist =
        await Artist.findByIdAndDelete(
            artistId
        );

    if (!artist) {
        throw new ApiError(
            404,
            "Artist Not Found"
        );
    }

    return {
        message:
            "Artist Deleted Successfully",
    };
};

module.exports = {
    createArtist,
    getArtists,
    getArtistById,
    updateArtist,
    deleteArtist,
};