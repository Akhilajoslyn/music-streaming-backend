const Album =
    require("../models/Album");

const ApiError =
    require("../utils/ApiError");

const uploadToCloudinary =
    require("../utils/uploadToCloudinary");

/*
====================================
Create Album
====================================
*/
const createAlbum =
    async (albumData) => {

        const {
            imageBuffer,
            ...data
        } = albumData;

        let imageUrl = "";

        if (imageBuffer) {

            const uploaded =
                await uploadToCloudinary(
                    imageBuffer,
                    "music-streaming/albums"
                );

            imageUrl =
                uploaded.secure_url;
        }

        return await Album.create({

            ...data,

            coverImage:
                imageUrl,
        });
    };

/*
====================================
Get All Albums
====================================
*/
const getAlbums =
    async () => {

        return await Album.find()
            .populate("artist");
    };

/*
====================================
Get Album By ID
====================================
*/
const getAlbumById =
    async (albumId) => {

        const album =
            await Album.findById(
                albumId
            )
                .populate("artist");

        if (!album) {
            throw new ApiError(
                404,
                "Album Not Found"
            );
        }

        return album;
    };

/*
====================================
Update Album
====================================
*/
const updateAlbum =
    async (
        albumId,
        albumData
    ) => {

        const album =
            await Album.findById(
                albumId
            );

        if (!album) {
            throw new ApiError(
                404,
                "Album Not Found"
            );
        }

        if (albumData.imageBuffer) {

            const uploaded =
                await uploadToCloudinary(
                    albumData.imageBuffer,
                    "music-streaming/albums"
                );

            album.coverImage =
                uploaded.secure_url;
        }

        if (albumData.title) {
            album.title =
                albumData.title;
        }

        if (albumData.description) {
            album.description =
                albumData.description;
        }

        if (albumData.artist) {
            album.artist =
                albumData.artist;
        }

        if (albumData.releaseDate) {
            album.releaseDate =
                albumData.releaseDate;
        }

        await album.save();

        return album;
    };

/*
====================================
Delete Album
====================================
*/
const deleteAlbum =
    async (albumId) => {

        const album =
            await Album.findByIdAndDelete(
                albumId
            );

        if (!album) {
            throw new ApiError(
                404,
                "Album Not Found"
            );
        }

        return {
            message:
                "Album Deleted Successfully",
        };
    };

module.exports = {
    createAlbum,
    getAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum,
};