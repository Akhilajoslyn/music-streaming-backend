const asyncHandler =
    require("../utils/asyncHandler");

const ApiResponse =
    require("../utils/ApiResponse");

const {
    createSong,
    getSongs,
    getSongById,
    searchSongs,
    updateSong,
    deleteSong,
    playSong,
} = require("../services/song.service");

/*
====================================
Create Song
====================================
*/
const createSongController =
    asyncHandler(async (
        req,
        res
    ) => {

        const song =
            await createSong({

                ...req.body,

                audioBuffer:
                    req.files?.audio?.[0]
                        ?.buffer,

                coverBuffer:
                    req.files?.cover?.[0]
                        ?.buffer,
            });

        return res.status(201).json(
            new ApiResponse(
                201,
                song,
                "Song Created Successfully"
            )
        );
    });

/*
====================================
Get All Songs
====================================
*/
const getSongsController =
    asyncHandler(async (
        req,
        res
    ) => {

        const songs =
            await getSongs();

        return res.status(200).json(
            new ApiResponse(
                200,
                songs,
                "Songs Fetched Successfully"
            )
        );
    });

/*
====================================
Get Song By ID
====================================
*/
const getSongByIdController =
    asyncHandler(async (
        req,
        res
    ) => {

        const song =
            await getSongById(
                req.params.songId
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                song,
                "Song Fetched Successfully"
            )
        );
    });

/*
====================================
Search Songs
====================================
*/
const searchSongsController =
    asyncHandler(async (
        req,
        res
    ) => {

        const songs =
            await searchSongs(
                req.query.q
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                songs,
                "Songs Found Successfully"
            )
        );
    });

/*
====================================
Update Song
====================================
*/
const updateSongController =
    asyncHandler(async (
        req,
        res
    ) => {

        const song =
            await updateSong(
                req.params.songId,
                req.body
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                song,
                "Song Updated Successfully"
            )
        );
    });

/*
====================================
Delete Song
====================================
*/
const deleteSongController =
    asyncHandler(async (
        req,
        res
    ) => {

        const result =
            await deleteSong(
                req.params.songId
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Song Deleted Successfully"
            )
        );
    });

/*
====================================
Play Song
====================================
*/
const playSongController =
    asyncHandler(async (
        req,
        res
    ) => {

        const song =
            await playSong(
                req.params.songId,
                req.user?._id
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                song,
                "Song Played Successfully"
            )
        );
    });

module.exports = {
    createSongController,
    getSongsController,
    getSongByIdController,
    searchSongsController,
    updateSongController,
    deleteSongController,
    playSongController,
};