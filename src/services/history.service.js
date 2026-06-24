const History =
    require("../models/History");

/*
====================================
Add To History
====================================
*/
const addToHistory =
    async (
        userId,
        songId
    ) => {

        return await History.create({
            user: userId,
            song: songId,
        });
    };

/*
====================================
Get User History
====================================
*/
const getHistory =
    async (
        userId
    ) => {

        return await History.find({
            user: userId,
        })
            .populate({
                path: "song",
                populate: [
                    {
                        path: "artist",
                    },
                    {
                        path: "album",
                    },
                ],
            })
            .sort({
                playedAt: -1,
            });
    };

/*
====================================
Clear History
====================================
*/
const clearHistory =
    async (
        userId
    ) => {

        await History.deleteMany({
            user: userId,
        });

        return {
            message:
                "History Cleared Successfully",
        };
    };

module.exports = {
    addToHistory,
    getHistory,
    clearHistory,
};