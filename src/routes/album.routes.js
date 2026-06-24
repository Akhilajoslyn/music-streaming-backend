const express =
    require("express");

const router =
    express.Router();

const authMiddleware =
    require("../middleware/auth.middleware");

const roleMiddleware =
    require("../middleware/role.middleware");

const validate =
    require("../middleware/validate.middleware");

const upload =
    require("../middleware/upload.middleware");

const {
    createAlbumSchema,
} = require("../validators/album.validator");

const {
    createAlbumController,
    getAlbumsController,
    getAlbumByIdController,
    updateAlbumController,
    deleteAlbumController,
} = require("../controllers/album.controller");

/*
====================================
Create Album
====================================
*/
router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    upload.single("image"),
    validate(createAlbumSchema),
    createAlbumController
);

/*
====================================
Get All Albums
====================================
*/
router.get(
    "/",
    getAlbumsController
);

/*
====================================
Get Album By ID
====================================
*/
router.get(
    "/:albumId",
    getAlbumByIdController
);

/*
====================================
Update Album
====================================
*/
router.put(
    "/:albumId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    upload.single("image"),
    updateAlbumController
);

/*
====================================
Delete Album
====================================
*/
router.delete(
    "/:albumId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    deleteAlbumController
);

module.exports = router;