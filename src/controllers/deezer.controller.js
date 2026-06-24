const asyncHandler =
    require("../utils/asyncHandler");

const ApiResponse =
    require("../utils/ApiResponse");

const {
    searchSongs,
} = require(
    "../services/deezer.service"
);

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
                "Songs Fetched Successfully"
            )
        );
    });

module.exports = {
    searchSongsController,
};