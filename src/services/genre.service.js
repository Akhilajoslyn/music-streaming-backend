const Genre =
    require("../models/Genre");

const ApiError =
    require("../utils/ApiError");

/*
====================================
Create Genre
====================================
*/
const createGenre =
    async (genreData) => {

        const existingGenre =
            await Genre.findOne({
                name: genreData.name,
            });

        if (existingGenre) {
            throw new ApiError(
                409,
                "Genre already exists"
            );
        }

        return await Genre.create(
            genreData
        );
    };

/*
====================================
Get All Genres
====================================
*/
const getGenres =
    async () => {

        return await Genre.find();
    };

/*
====================================
Get Genre By ID
====================================
*/
const getGenreById =
    async (genreId) => {

        const genre =
            await Genre.findById(
                genreId
            );

        if (!genre) {
            throw new ApiError(
                404,
                "Genre Not Found"
            );
        }

        return genre;
    };

/*
====================================
Update Genre
====================================
*/
const updateGenre =
    async (
        genreId,
        updateData
    ) => {

        const genre =
            await Genre.findByIdAndUpdate(
                genreId,
                updateData,
                {
                    new: true,
                }
            );

        if (!genre) {
            throw new ApiError(
                404,
                "Genre Not Found"
            );
        }

        return genre;
    };

/*
====================================
Delete Genre
====================================
*/
const deleteGenre =
    async (genreId) => {

        const genre =
            await Genre.findByIdAndDelete(
                genreId
            );

        if (!genre) {
            throw new ApiError(
                404,
                "Genre Not Found"
            );
        }

        return {
            message:
                "Genre Deleted Successfully",
        };
    };

module.exports = {
    createGenre,
    getGenres,
    getGenreById,
    updateGenre,
    deleteGenre,
};