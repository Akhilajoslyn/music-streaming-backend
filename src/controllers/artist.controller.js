const asyncHandler =
    require("../utils/asyncHandler");

const ApiResponse =
    require("../utils/ApiResponse");

const {
    createArtist,
    getArtists,
    getArtistById,
    updateArtist,
    deleteArtist,
} = require("../services/artist.service");

/*
====================================
Create Artist
====================================
*/
const createArtistController =
    asyncHandler(async (
        req,
        res
    ) => {

        const artist =
            await createArtist({

                ...req.body,

                imageBuffer:
                    req.file?.buffer,
            });

        return res.status(201).json(
            new ApiResponse(
                201,
                artist,
                "Artist Created Successfully"
            )
        );
    });

/*
====================================
Get All Artists
====================================
*/
const getArtistsController =
    asyncHandler(async (
        req,
        res
    ) => {

        const artists =
            await getArtists();

        return res.status(200).json(
            new ApiResponse(
                200,
                artists,
                "Artists Fetched Successfully"
            )
        );
    });

/*
====================================
Get Artist By ID
====================================
*/
const getArtistByIdController =
    asyncHandler(async (
        req,
        res
    ) => {

        const artist =
            await getArtistById(
                req.params.artistId
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                artist,
                "Artist Fetched Successfully"
            )
        );
    });

/*
====================================
Update Artist
====================================
*/
const updateArtistController =
    asyncHandler(async (
        req,
        res
    ) => {

        const artist =
            await updateArtist(
                req.params.artistId,
                {
                    ...req.body,
                    imageBuffer:
                        req.file?.buffer,
                }
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                artist,
                "Artist Updated Successfully"
            )
        );
    });

/*
====================================
Delete Artist
====================================
*/
const deleteArtistController =
    asyncHandler(async (
        req,
        res
    ) => {

        const result =
            await deleteArtist(
                req.params.artistId
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Artist Deleted Successfully"
            )
        );
    });

module.exports = {
    createArtistController,
    getArtistsController,
    getArtistByIdController,
    updateArtistController,
    deleteArtistController,
};