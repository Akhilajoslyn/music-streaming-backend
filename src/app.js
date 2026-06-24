const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
// const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

const notFound = require("./middleware/notFound.middleware");
const errorHandler = require("./middleware/error.middleware");

const validate = require("./middleware/validate.middleware");
const {
    registerSchema,
} = require("./validators/auth.validator");

const authRoutes = require("./routes/auth.routes");

const app = express();

/*
=========================
Security Middleware
=========================
*/

app.use(helmet());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

/*
=========================
Body Parsers
=========================
*/

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cookieParser());

/*
=========================
Security Protection
=========================
*/

// app.use(mongoSanitize());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

app.use(limiter);

/*
=========================
Health Check Route
=========================
*/

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Music Streaming API Running",
    });
});

/*
=========================
API Routes
=========================
*/

// app.use("/api/v1/auth", authRoutes);

/*


/*
=========================
Test Route
=========================
*/

app.post(
    "/test-register",
    validate(registerSchema),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Validation Passed",
        });
    }
);


const User = require("./models/User");

app.get("/test-user", async (req, res) => {
    const user = await User.create({
        name: "Akhila",
        email: "akhila@gmail.com",
        password: "123456",
    });

    res.json(user);
});


app.use(
    "/api/v1/auth",
    authRoutes
);

const genreRoutes = require(
    "./routes/genre.routes"
);

app.use(
    "/api/v1/genres",
    genreRoutes
);


const testRoutes =
    require("./routes/test.routes");

    app.use(
    "/api/v1/test",
    testRoutes
);


const artistRoutes =
    require("./routes/artist.routes");

    app.use(
    "/api/v1/artists",
    artistRoutes
);

const albumRoutes =
    require("./routes/album.routes");


    app.use(
    "/api/v1/albums",
    albumRoutes
);

const songRoutes =
    require("./routes/song.routes");

app.use(
    "/api/v1/songs",
    songRoutes
);


const playlistRoutes =
    require("./routes/playlist.routes");

app.use(
    "/api/v1/playlists",
    playlistRoutes
);

const favoriteRoutes =
    require("./routes/favorite.routes");

app.use(
    "/api/v1/favorites",
    favoriteRoutes
);


const historyRoutes =
    require("./routes/history.routes");

app.use(
    "/api/v1/history",
    historyRoutes
);

const dashboardRoutes =
    require("./routes/dashboard.routes");

app.use(
    "/api/v1/dashboard",
    dashboardRoutes
);

// const deezerRoutes =
//     require("./routes/deezer.routes");

// app.use(
//     "/api/v1/deezer",
//     deezerRoutes
// );

const searchRoutes =
    require("./routes/search.routes");

app.use(
    "/api/v1/search",
    searchRoutes
);

/*
=========================
404 Middleware
=========================
*/

app.use(notFound);


/*
=========================
Global Error Middleware
=========================
*/

app.use(errorHandler);

module.exports = app;