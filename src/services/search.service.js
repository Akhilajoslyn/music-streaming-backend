const Song =
    require("../models/Song");

const searchSongs =
    async (query) => {

        const localSongs =
            await Song.find({
                title: {
                    $regex: query,
                    $options: "i",
                },
            })
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

        return {

            totalResults:
                localSongs.length,

            localSongs,
        };
    };

module.exports = {
    searchSongs,
};