const asyncHandler =
    require("../utils/asyncHandler");

const ApiResponse =
    require("../utils/ApiResponse");

const {
    addToHistory,
    getHistory,
    clearHistory,
} = require("../services/history.service");

const addToHistoryController =
    asyncHandler(async (
        req,
        res
    ) => {

        const history =
            await addToHistory(
                req.user._id,
                req.params.songId
            );

        return res.status(201).json(
            new ApiResponse(
                201,
                history,
                "Added To History"
            )
        );
    });

const getHistoryController =
    asyncHandler(async (
        req,
        res
    ) => {

        const history =
            await getHistory(
                req.user._id
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                history,
                "History Fetched Successfully"
            )
        );
    });

const clearHistoryController =
    asyncHandler(async (
        req,
        res
    ) => {

        const result =
            await clearHistory(
                req.user._id
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "History Cleared Successfully"
            )
        );
    });

module.exports = {
    addToHistoryController,
    getHistoryController,
    clearHistoryController,
};