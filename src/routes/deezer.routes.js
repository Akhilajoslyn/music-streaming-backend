const express =
    require("express");

const router =
    express.Router();

const {
    searchSongsController,
} = require(
    "../controllers/deezer.controller"
);

router.get(
    "/search",
    searchSongsController
);

module.exports =
    router;