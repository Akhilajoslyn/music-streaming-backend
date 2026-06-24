const asyncHandler =
    require("../utils/asyncHandler");

const ApiResponse =
    require("../utils/ApiResponse");

const {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    getPlaylistSongs,
} = require("../services/playlist.service");

const createPlaylistController =
    asyncHandler(async (
        req,
        res
    ) => {

        const playlist =
            await createPlaylist(
                req.user._id,
                req.body
            );

        return res.status(201).json(
            new ApiResponse(
                201,
                playlist,
                "Playlist Created Successfully"
            )
        );
    });

const getUserPlaylistsController =
    asyncHandler(async (
        req,
        res
    ) => {

        const playlists =
            await getUserPlaylists(
                req.user._id
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                playlists,
                "Playlists Fetched Successfully"
            )
        );
    });

const getPlaylistByIdController =
    asyncHandler(async (
        req,
        res
    ) => {

        const playlist =
            await getPlaylistById(
                req.params.playlistId
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                playlist,
                "Playlist Fetched Successfully"
            )
        );
    });

const updatePlaylistController =
    asyncHandler(async (
        req,
        res
    ) => {

        const playlist =
            await updatePlaylist(
                req.params.playlistId,
                req.user._id,
                req.body
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                playlist,
                "Playlist Updated Successfully"
            )
        );
    });

const deletePlaylistController =
    asyncHandler(async (
        req,
        res
    ) => {

        const result =
            await deletePlaylist(
                req.params.playlistId,
                req.user._id
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Playlist Deleted Successfully"
            )
        );
    });

const addSongController =
    asyncHandler(async (
        req,
        res
    ) => {

        const playlist =
            await addSongToPlaylist(
                req.params.playlistId,
                req.body.songId
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                playlist,
                "Song Added Successfully"
            )
        );
    });

const removeSongController =
    asyncHandler(async (
        req,
        res
    ) => {

        const playlist =
            await removeSongFromPlaylist(
                req.params.playlistId,
                req.params.songId
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                playlist,
                "Song Removed Successfully"
            )
        );
    });

const getPlaylistSongsController =
    asyncHandler(async (
        req,
        res
    ) => {

        const songs =
            await getPlaylistSongs(
                req.params.playlistId
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                songs,
                "Playlist Songs Fetched Successfully"
            )
        );
    });

module.exports = {
    createPlaylistController,
    getUserPlaylistsController,
    getPlaylistByIdController,
    updatePlaylistController,
    deletePlaylistController,
    addSongController,
    removeSongController,
    getPlaylistSongsController,
};