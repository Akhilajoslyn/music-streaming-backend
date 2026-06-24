const asyncHandler =
    require("../utils/asyncHandler");

const ApiResponse =
    require("../utils/ApiResponse");

const {
    createGenre,
    getGenres,
    getGenreById,
    updateGenre,
    deleteGenre,
} = require("../services/genre.service");

/*
====================================
Create Genre
====================================
*/
const createGenreController =
    asyncHandler(async (
        req,
        res
    ) => {

        const genre =
            await createGenre(
                req.body
            );

        return res.status(201).json(
            new ApiResponse(
                201,
                genre,
                "Genre Created Successfully"
            )
        );
    });

/*
====================================
Get All Genres
====================================
*/
const getGenresController =
    asyncHandler(async (
        req,
        res
    ) => {

        const genres =
            await getGenres();

        return res.status(200).json(
            new ApiResponse(
                200,
                genres,
                "Genres Fetched Successfully"
            )
        );
    });

/*
====================================
Get Genre By ID
====================================
*/
const getGenreByIdController =
    asyncHandler(async (
        req,
        res
    ) => {

        const genre =
            await getGenreById(
                req.params.genreId
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                genre,
                "Genre Fetched Successfully"
            )
        );
    });

/*
====================================
Update Genre
====================================
*/
const updateGenreController =
    asyncHandler(async (
        req,
        res
    ) => {

        const genre =
            await updateGenre(
                req.params.genreId,
                req.body
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                genre,
                "Genre Updated Successfully"
            )
        );
    });

/*
====================================
Delete Genre
====================================
*/
const deleteGenreController =
    asyncHandler(async (
        req,
        res
    ) => {

        const result =
            await deleteGenre(
                req.params.genreId
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Genre Deleted Successfully"
            )
        );
    });

module.exports = {
    createGenreController,
    getGenresController,
    getGenreByIdController,
    updateGenreController,
    deleteGenreController,
};