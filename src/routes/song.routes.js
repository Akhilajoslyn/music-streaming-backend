const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require("../middleware/auth.middleware");

const roleMiddleware =
    require("../middleware/role.middleware");

const upload =
    require("../middleware/upload.middleware");

const {
    createSongController,
    getSongsController,
    getSongByIdController,
    searchSongsController,
    updateSongController,
    deleteSongController,
    playSongController,
} = require("../controllers/song.controller");

/*
====================================
Create Song
====================================
*/
router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),

    upload.fields([
        {
            name: "audio",
            maxCount: 1,
        },
        {
            name: "cover",
            maxCount: 1,
        },
    ]),

    createSongController
);

/*
====================================
Get All Songs
====================================
*/
router.get(
    "/",
    getSongsController
);

/*
====================================
Search Songs
IMPORTANT:
Keep this above /:songId
====================================
*/
router.get(
    "/search",
    searchSongsController
);

/*
====================================
Get Song By ID
====================================
*/
router.get(
    "/:songId",
    getSongByIdController
);

/*
====================================
Update Song
====================================
*/
router.put(
    "/:songId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    updateSongController
);

/*
====================================
Delete Song
====================================
*/
router.delete(
    "/:songId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    deleteSongController
);

/*
====================================
Play Song
====================================
*/
router.post(
    "/:songId/play",
    authMiddleware,
    playSongController
);

module.exports =
    router;