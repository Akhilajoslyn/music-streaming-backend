const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require("../middleware/auth.middleware");

const validate =
    require("../middleware/validate.middleware");

const {
    createPlaylistSchema,
} = require("../validators/playlist.validator");

const {
    createPlaylistController,
    getUserPlaylistsController,
    getPlaylistByIdController,
    updatePlaylistController,
    deletePlaylistController,
    addSongController,
    removeSongController,
    getPlaylistSongsController,
} = require("../controllers/playlist.controller");

router.post(
    "/",
    authMiddleware,
    validate(
        createPlaylistSchema
    ),
    createPlaylistController
);

router.get(
    "/",
    authMiddleware,
    getUserPlaylistsController
);

router.get(
    "/:playlistId",
    authMiddleware,
    getPlaylistByIdController
);

router.put(
    "/:playlistId",
    authMiddleware,
    updatePlaylistController
);

router.delete(
    "/:playlistId",
    authMiddleware,
    deletePlaylistController
);

router.post(
    "/:playlistId/songs",
    authMiddleware,
    addSongController
);

router.delete(
    "/:playlistId/songs/:songId",
    authMiddleware,
    removeSongController
);

router.get(
    "/:playlistId/songs",
    authMiddleware,
    getPlaylistSongsController
);

module.exports =
    router;