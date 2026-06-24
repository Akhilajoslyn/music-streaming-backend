const axios =
    require("axios");

const searchSongs =
    async (query) => {

        console.log(
            "Data Length:",
            response.data.data.length
        );

        const response =
            await axios.get(
                `https://api.deezer.com/search?q=${encodeURIComponent(query)}`,
                {
                    headers: {
                        "User-Agent":
                            "Mozilla/5.0",
                    },
                }
            );

        console.log(
            JSON.stringify(
                response.data,
                null,
                2
            )
        );

        return response.data.data;
    };

module.exports = {
    searchSongs,
};