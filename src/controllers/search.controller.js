const asyncHandler =
    require("../utils/asyncHandler");

const ApiResponse =
    require("../utils/ApiResponse");

const {
    searchSongs,
} = require(
    "../services/search.service"
);

const searchSongsController =
    asyncHandler(async (
        req,
        res
    ) => {

        const result =
            await searchSongs(
                req.query.q
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Search Results Fetched Successfully"
            )
        );
    });

module.exports = {
    searchSongsController,
};