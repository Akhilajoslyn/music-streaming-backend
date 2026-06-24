const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/auth.middleware");

const roleMiddleware =
    require("../middleware/role.middleware");

const upload =
    require("../middleware/upload.middleware");

const {
    createArtistController,
    getArtistsController,
    getArtistByIdController,
    updateArtistController,
    deleteArtistController,
} = require("../controllers/artist.controller");

/*
====================================
Create Artist
====================================
*/
router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    upload.single("image"),
    createArtistController
);

/*
====================================
Get All Artists
====================================
*/
router.get(
    "/",
    getArtistsController
);

/*
====================================
Get Artist By ID
====================================
*/
router.get(
    "/:artistId",
    getArtistByIdController
);

/*
====================================
Update Artist
====================================
*/
router.put(
    "/:artistId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    upload.single("image"),
    updateArtistController
);

/*
====================================
Delete Artist
====================================
*/
router.delete(
    "/:artistId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    deleteArtistController
);

module.exports = router;