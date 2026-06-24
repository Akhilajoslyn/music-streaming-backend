const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require("../middleware/auth.middleware");

const {
    addToHistoryController,
    getHistoryController,
    clearHistoryController,
} = require(
    "../controllers/history.controller"
);

router.post(
    "/:songId",
    authMiddleware,
    addToHistoryController
);

router.get(
    "/",
    authMiddleware,
    getHistoryController
);

router.delete(
    "/",
    authMiddleware,
    clearHistoryController
);

module.exports =
    router;