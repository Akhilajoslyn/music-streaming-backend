const Favorite =
    require("../models/Favorite");

const ApiError =
    require("../utils/ApiError");

const addFavorite =
    async (
        userId,
        songId
    ) => {

        const existing =
            await Favorite.findOne({
                user: userId,
                song: songId,
            });

        if (existing) {
            throw new ApiError(
                409,
                "Song already liked"
            );
        }

        return await Favorite.create({
            user: userId,
            song: songId,
        });
    };

const getFavorites =
    async (userId) => {

        return await Favorite.find({
            user: userId,
        })
            .populate({
                path: "song",
                populate: [
                    {
                        path: "artist",
                    },
                    {
                        path: "album",
                    },
                ],
            });
    };

const removeFavorite =
    async (
        userId,
        songId
    ) => {

        const favorite =
            await Favorite.findOneAndDelete({
                user: userId,
                song: songId,
            });

        if (!favorite) {
            throw new ApiError(
                404,
                "Favorite not found"
            );
        }

        return {
            message:
                "Song removed from favorites",
        };
    };

module.exports = {
    addFavorite,
    getFavorites,
    removeFavorite,
};