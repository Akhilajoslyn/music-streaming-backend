const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require("../middleware/auth.middleware");

const {
    addFavoriteController,
    getFavoritesController,
    removeFavoriteController,
} = require(
    "../controllers/favorite.controller"
);

router.post(
    "/:songId",
    authMiddleware,
    addFavoriteController
);

router.get(
    "/",
    authMiddleware,
    getFavoritesController
);

router.delete(
    "/:songId",
    authMiddleware,
    removeFavoriteController
);

module.exports = router;