const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require("../middleware/auth.middleware");

const roleMiddleware =
    require("../middleware/role.middleware");

const {
    getDashboardController,
} = require(
    "../controllers/dashboard.controller"
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    getDashboardController
);

module.exports = router;