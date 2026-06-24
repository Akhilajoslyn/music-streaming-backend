const asyncHandler =
    require("../utils/asyncHandler");

const ApiResponse =
    require("../utils/ApiResponse");

const {
    addFavorite,
    getFavorites,
    removeFavorite,
} = require("../services/favorite.service");

const addFavoriteController =
    asyncHandler(async (
        req,
        res
    ) => {

        const favorite =
            await addFavorite(
                req.user._id,
                req.params.songId
            );

        return res.status(201).json(
            new ApiResponse(
                201,
                favorite,
                "Song Liked Successfully"
            )
        );
    });

const getFavoritesController =
    asyncHandler(async (
        req,
        res
    ) => {

        const favorites =
            await getFavorites(
                req.user._id
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                favorites,
                "Favorites Fetched Successfully"
            )
        );
    });

const removeFavoriteController =
    asyncHandler(async (
        req,
        res
    ) => {

        const result =
            await removeFavorite(
                req.user._id,
                req.params.songId
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Favorite Removed Successfully"
            )
        );
    });

module.exports = {
    addFavoriteController,
    getFavoritesController,
    removeFavoriteController,
};