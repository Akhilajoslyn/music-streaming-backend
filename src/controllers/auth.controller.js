const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    refreshAccessToken,
    logoutUser,
    googleLogin,
} = require("../services/auth.service");


const register = asyncHandler(
    async (req, res) => {
        const result = await registerUser(
            req.body
        );

        return res.status(201).json(
            new ApiResponse(
                201,
                result,
                "User Registered Successfully"
            )
        );
    }
);

const login = asyncHandler(
    async (req, res) => {
        const result =
            await loginUser(req.body);

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Login Successful"
            )
        );
    }
);

const forgotPasswordController =
    asyncHandler(async (
        req,
        res
    ) => {

        const result =
            await forgotPassword(
                req.body.email
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Reset Email Sent"
            )
        );
    });

const resetPasswordController =
    asyncHandler(async (
        req,
        res
    ) => {

        const result =
            await resetPassword(
                req.params.token,
                req.body.password
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Password Reset Successful"
            )
        );
    });

const refreshTokenController =
    asyncHandler(async (
        req,
        res
    ) => {

        const result =
            await refreshAccessToken(
                req.body.refreshToken
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Access Token Refreshed"
            )
        );
    });

    const logoutController =
    asyncHandler(async (
        req,
        res
    ) => {

        const result =
            await logoutUser(
                req.user._id
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Logout Successful"
            )
        );
    });

    const googleLoginController =
    asyncHandler(
        async (
            req,
            res
        ) => {

            const result =
                await googleLogin(
                    req.body.token
                );

            return res
                .status(200)
                .json(

                    new ApiResponse(
                        200,
                        result,
                        "Google Login Successful"
                    )
                );
        }
    );

module.exports = {
    register,
    login,
    forgotPasswordController,
    resetPasswordController,
    refreshTokenController,
    logoutController,
    googleLoginController,
};