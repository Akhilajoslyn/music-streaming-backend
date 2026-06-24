const express = require("express");

const router = express.Router();

const {
    createGenreController,
    getGenresController,
    getGenreByIdController,
    updateGenreController,
    deleteGenreController,
} = require(
    "../controllers/genre.controller"
);

const validate = require(
    "../middleware/validate.middleware"
);

const authMiddleware = require(
    "../middleware/auth.middleware"
);

const roleMiddleware = require(
    "../middleware/role.middleware"
);

const {
    createGenreSchema,
} = require(
    "../validators/genre.validator"
);

/*
====================================
Create Genre
====================================
*/
router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    validate(createGenreSchema),
    createGenreController
);

/*
====================================
Get All Genres
====================================
*/
router.get(
    "/",
    getGenresController
);

/*
====================================
Get Genre By ID
====================================
*/
router.get(
    "/:genreId",
    getGenreByIdController
);

/*
====================================
Update Genre
====================================
*/
router.put(
    "/:genreId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    updateGenreController
);

/*
====================================
Delete Genre
====================================
*/
router.delete(
    "/:genreId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    deleteGenreController
);

module.exports = router;