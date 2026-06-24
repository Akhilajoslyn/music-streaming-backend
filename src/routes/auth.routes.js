const express = require("express");

const validate = require(
    "../middleware/validate.middleware"
);

const {
    registerSchema,
    loginSchema,
} = require("../validators/auth.validator");

const {
    register,
    login,
    forgotPasswordController,
    resetPasswordController,
    refreshTokenController,
    logoutController,
    googleLoginController,
    
} = require("../controllers/auth.controller");

const authMiddleware = require(
    "../middleware/auth.middleware"
);

const roleMiddleware = require(
    "../middleware/role.middleware"
);

const router = express.Router();

router.post(
    "/register",
    validate(registerSchema),
    register
);


router.post(
    "/login",
    validate(loginSchema),
    login
);

router.post(
    "/google-login",
    googleLoginController
);

router.post(
    "/refresh-token",
    refreshTokenController
);

router.post(
    "/forgot-password",
    forgotPasswordController
);

router.post(
    "/reset-password/:token",
    resetPasswordController
);


router.get(
    "/me",
    authMiddleware,
    (req, res) => {
        res.status(200).json({
            success: true,
            data: req.user,
        });
    }
);



router.get(
    "/admin-test",
    authMiddleware,
    roleMiddleware("ADMIN"),
    (req, res) => {
        res.json({
            success: true,
            message: "Admin Access Granted",
        });
    }
);


router.post(
    "/logout",
    authMiddleware,
    logoutController
);
module.exports = router;