const Song =
    require("../models/Song");

const ApiError =
    require("../utils/ApiError");

const uploadToCloudinary =
    require("../utils/uploadToCloudinary");

const History =
    require("../models/History");

/*
====================================
Create Song
====================================
*/
const createSong =
    async (songData) => {

        let audioUrl = "";

        let coverImage = "";

        if (
            songData.audioBuffer
        ) {

            const uploadedAudio =
                await uploadToCloudinary(
                    songData.audioBuffer,
                    "music-streaming/songs",
                    "video"
                );

            audioUrl =
                uploadedAudio.secure_url;
        }

        if (
            songData.coverBuffer
        ) {

            const uploadedImage =
                await uploadToCloudinary(
                    songData.coverBuffer,
                    "music-streaming/song-covers",
                    "image"
                );

            coverImage =
                uploadedImage.secure_url;
        }

        const song =
            await Song.create({

                title:
                    songData.title,

                artist:
                    songData.artist,

                album:
                    songData.album,

                genre:
                    songData.genre,

                audioUrl,

                coverImage,
            });

        return song;
    };

/*
====================================
Get All Songs
====================================
*/
const getSongs =
    async () => {

        return await Song.find()


            .select(
                "-__v"
            )

            .populate(
                "artist",
                "name image"
            )

            .populate(
                "album",
                "title coverImage"
            )

            .populate(
                "genre",
                "name"
            );
    };

/*
====================================
Get Song By ID
====================================
*/
const getSongById =
    async (songId) => {

        const song =
            await Song.findById(
                songId
            )

                .select(
                    "-__v"
                )

                .populate(
                    "artist",
                    "name image"
                )

                .populate(
                    "album",
                    "title coverImage"
                )

                .populate(
                    "genre",
                    "name"
                );

        if (!song) {
            throw new ApiError(
                404,
                "Song Not Found"
            );
        }

        return song;
    };

/*
====================================
Search Songs
====================================
*/
const searchSongs =
    async (searchTerm) => {

        return await Song.find({
            title: {
                $regex:
                    searchTerm,
                $options: "i",
            },
        })

            .select(
                "-__v"
            )


            .populate(
                "artist",
                "name image"
            )

            .populate(
                "album",
                "title coverImage"
            )

            .populate(
                "genre",
                "name"
            );
    };

/*
====================================
Update Song
====================================
*/
const updateSong =
    async (
        songId,
        updateData
    ) => {

        const song =
            await Song.findByIdAndUpdate(
                songId,
                updateData,
                {
                    new: true,
                }
            )
                .select(
                    "-__v"
                )

                .populate(
                    "artist",
                    "name image"
                )

                .populate(
                    "album",
                    "title coverImage"
                )

                .populate(
                    "genre",
                    "name"
                );

        if (!song) {
            throw new ApiError(
                404,
                "Song Not Found"
            );
        }

        return song;
    };

/*
====================================
Delete Song
====================================
*/
const deleteSong =
    async (songId) => {

        const song =
            await Song.findByIdAndDelete(
                songId
            );

        if (!song) {
            throw new ApiError(
                404,
                "Song Not Found"
            );
        }

        return {
            message:
                "Song Deleted Successfully",
        };
    };

/*
====================================
Increment Play Count
====================================
*/
const playSong =
    async (
        songId,
        userId
    ) => {

        const song =
            await Song.findByIdAndUpdate(
                songId,
                {
                    $inc: {
                        plays: 1,
                    },
                },
                {
                    new: true,
                }
            )

                .populate(
                    "artist",
                    "name image"
                )

                .populate(
                    "album",
                    "title coverImage"
                )

                .populate(
                    "genre",
                    "name"
                );

        if (!song) {
            throw new ApiError(
                404,
                "Song Not Found"
            );
        }

        if (userId) {

            await History.create({
                user: userId,
                song: songId,
            });
        }

        return song;
    };

module.exports = {
    createSong,
    getSongs,
    getSongById,
    searchSongs,
    updateSong,
    deleteSong,
    playSong,
};