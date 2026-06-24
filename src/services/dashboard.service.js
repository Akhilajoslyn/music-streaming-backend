const User =
    require("../models/User");

const Song =
    require("../models/Song");

const Artist =
    require("../models/Artist");

const Album =
    require("../models/Album");

const Playlist =
    require("../models/Playlist");

const Favorite =
    require("../models/Favorite");

const History =
    require("../models/History");

const getDashboardStats =
    async () => {

        const totalUsers =
            await User.countDocuments();

        const totalSongs =
            await Song.countDocuments();

        const totalArtists =
            await Artist.countDocuments();

        const totalAlbums =
            await Album.countDocuments();

        const totalPlaylists =
            await Playlist.countDocuments();

        const totalFavorites =
            await Favorite.countDocuments();

        const totalHistory =
            await History.countDocuments();

        const topSongs =
            await Song.find()
                .sort({
                    plays: -1,
                })
                .limit(5)
                .select(
                    "title plays"
                );

        return {
            totalUsers,
            totalSongs,
            totalArtists,
            totalAlbums,
            totalPlaylists,
            totalFavorites,
            totalHistory,
            topSongs,
        };
    };

module.exports = {
    getDashboardStats,
};