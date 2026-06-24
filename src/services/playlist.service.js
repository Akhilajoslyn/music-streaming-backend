const Playlist =
    require("../models/Playlist");

const ApiError =
    require("../utils/ApiError");

/*
====================================
Create Playlist
====================================
*/
const createPlaylist =
    async (
        userId,
        playlistData
    ) => {

        return await Playlist.create({

            name:
                playlistData.name,

            description:
                playlistData.description,

            user:
                userId,

            isPublic:
                playlistData.isPublic ??
                true,
        });
    };

/*
====================================
Get User Playlists
====================================
*/
const getUserPlaylists =
    async (
        userId
    ) => {

        return await Playlist.find({
            user: userId,
        })
            .populate("songs");
    };

/*
====================================
Get Playlist By ID
====================================
*/
const getPlaylistById =
    async (
        playlistId
    ) => {

        const playlist =
            await Playlist.findById(
                playlistId
            )
                .populate("songs")
                .populate(
                    "user",
                    "name email"
                );

        if (!playlist) {
            throw new ApiError(
                404,
                "Playlist Not Found"
            );
        }

        return playlist;
    };

/*
====================================
Update Playlist
====================================
*/
const updatePlaylist =
    async (
        playlistId,
        userId,
        updateData
    ) => {

        const playlist =
            await Playlist.findById(
                playlistId
            );

        if (!playlist) {
            throw new ApiError(
                404,
                "Playlist Not Found"
            );
        }

        if (
            playlist.user.toString() !==
            userId.toString()
        ) {
            throw new ApiError(
                403,
                "Not Authorized"
            );
        }

        if (
            updateData.name
        ) {
            playlist.name =
                updateData.name;
        }

        if (
            updateData.description
        ) {
            playlist.description =
                updateData.description;
        }

        if (
            updateData.isPublic !==
            undefined
        ) {
            playlist.isPublic =
                updateData.isPublic;
        }

        await playlist.save();

        return playlist;
    };

/*
====================================
Delete Playlist
====================================
*/
const deletePlaylist =
    async (
        playlistId,
        userId
    ) => {

        const playlist =
            await Playlist.findById(
                playlistId
            );

        if (!playlist) {
            throw new ApiError(
                404,
                "Playlist Not Found"
            );
        }

        if (
            playlist.user.toString() !==
            userId.toString()
        ) {
            throw new ApiError(
                403,
                "Not Authorized"
            );
        }

        await Playlist.findByIdAndDelete(
            playlistId
        );

        return {
            message:
                "Playlist Deleted Successfully",
        };
    };

/*
====================================
Add Song
====================================
*/
const addSongToPlaylist =
    async (
        playlistId,
        songId
    ) => {

        const playlist =
            await Playlist.findById(
                playlistId
            );

        if (!playlist) {
            throw new ApiError(
                404,
                "Playlist Not Found"
            );
        }

        if (
            !playlist.songs.includes(
                songId
            )
        ) {
            playlist.songs.push(
                songId
            );
        }

        await playlist.save();

        return playlist;
    };

/*
====================================
Remove Song
====================================
*/
const removeSongFromPlaylist =
    async (
        playlistId,
        songId
    ) => {

        const playlist =
            await Playlist.findById(
                playlistId
            );

        if (!playlist) {
            throw new ApiError(
                404,
                "Playlist Not Found"
            );
        }

        playlist.songs =
            playlist.songs.filter(
                (song) =>
                    song.toString() !==
                    songId
            );

        await playlist.save();

        return playlist;
    };

/*
====================================
Get Playlist Songs
====================================
*/
const getPlaylistSongs =
    async (
        playlistId
    ) => {

        const playlist =
            await Playlist.findById(
                playlistId
            )
                .populate({
                    path: "songs",
                    populate: [
                        {
                            path: "artist",
                        },
                        {
                            path: "album",
                        },
                    ],
                });

        if (!playlist) {
            throw new ApiError(
                404,
                "Playlist Not Found"
            );
        }

        return playlist.songs;
    };

module.exports = {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    getPlaylistSongs,
};