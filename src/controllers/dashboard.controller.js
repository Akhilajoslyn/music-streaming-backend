const asyncHandler =
    require("../utils/asyncHandler");

const ApiResponse =
    require("../utils/ApiResponse");

const {
    getDashboardStats,
} = require(
    "../services/dashboard.service"
);

const getDashboardController =
    asyncHandler(async (
        req,
        res
    ) => {

        const stats =
            await getDashboardStats();

        return res.status(200).json(
            new ApiResponse(
                200,
                stats,
                "Dashboard Data Fetched Successfully"
            )
        );
    });

module.exports = {
    getDashboardController,
};