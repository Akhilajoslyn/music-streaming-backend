const asyncHandler =
    require("../utils/asyncHandler");

const ApiResponse =
    require("../utils/ApiResponse");

const {
    createAlbum,
    getAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum,
} = require("../services/album.service");

/*
====================================
Create Album
====================================
*/
const createAlbumController =
    asyncHandler(async (
        req,
        res
    ) => {

        const album =
            await createAlbum({

                ...req.body,

                imageBuffer:
                    req.file?.buffer,
            });

        return res.status(201).json(
            new ApiResponse(
                201,
                album,
                "Album Created Successfully"
            )
        );
    });

/*
====================================
Get All Albums
====================================
*/
const getAlbumsController =
    asyncHandler(async (
        req,
        res
    ) => {

        const albums =
            await getAlbums();

        return res.status(200).json(
            new ApiResponse(
                200,
                albums,
                "Albums Fetched Successfully"
            )
        );
    });

/*
====================================
Get Album By ID
====================================
*/
const getAlbumByIdController =
    asyncHandler(async (
        req,
        res
    ) => {

        const album =
            await getAlbumById(
                req.params.albumId
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                album,
                "Album Fetched Successfully"
            )
        );
    });

/*
====================================
Update Album
====================================
*/
const updateAlbumController =
    asyncHandler(async (
        req,
        res
    ) => {

        const album =
            await updateAlbum(
                req.params.albumId,
                {
                    ...req.body,
                    imageBuffer:
                        req.file?.buffer,
                }
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                album,
                "Album Updated Successfully"
            )
        );
    });

/*
====================================
Delete Album
====================================
*/
const deleteAlbumController =
    asyncHandler(async (
        req,
        res
    ) => {

        const result =
            await deleteAlbum(
                req.params.albumId
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Album Deleted Successfully"
            )
        );
    });

module.exports = {
    createAlbumController,
    getAlbumsController,
    getAlbumByIdController,
    updateAlbumController,
    deleteAlbumController,
};