const express =
    require("express");

const router =
    express.Router();

const {
    searchSongsController,
} = require(
    "../controllers/search.controller"
);

router.get(
    "/",
    searchSongsController
);

module.exports =
    router;