require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { loginSignup } = require("../CNTROLERS/loginSignupControler");
const { authorised } = require("../MIDDLEWARE/verifyJWT");
const { UserControler } = require("../CNTROLERS/userController");
const { matchControler } = require("../CNTROLERS/matchControler");
const { mongoose } = require("../IMPORTS/imports");
const { handleRefreshToken } = require("../CNTROLERS/refreshTokenControler");

const app = express();
const PORT = process.env.PORT;

if (process.env.NODE_ENV.trim() === "development") {
  app.listen(PORT, (error) => {
    if (error) {
      console.error(new Error("Internal server error"));
    } else {
      mongoose
        .connect(DB_LINK)
        .then((db) => {
          console.log("db connected and listening on " + PORT);
        })
        .catch((error) => console.error(new Error(error)));
    }
  });
} else {
  // PRODUCTION ENVIRONMENT
  // check for the environment variables
  if (!process.env.PORT || !process.env.WHITELIST || !process.env.DB_LINK) {
    console.error(new Error("ENVIRONMENT VARIABLES ARE NOT ACCESSIBEL"));
  } else {
    app.listen(PORT, (error) => {
      if (error) {
        console.error(new Error("Internal server error"));
      } else {
        mongoose
          .connect(DB_LINK)
          .then((db) => {
            console.log("db connected and listening on " + PORT);
          })
          .catch((error) => console.error(new Error(error)));
      }
    });
  }
}

const WHITELIST = process.env.WHITELIST;
const DB_LINK = process.env.DB_LINK;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, cb) => {
      if (WHITELIST.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error("Permission denied"));
      }
    },
    optionsSuccessStatus: 200,
    preflightContinue: true,
    credentials: true,
    allowedHeaders: "Content-Type , Authorization",
  })
);
// ------------

app.post("/login", loginSignup.LOGIN);
app.post("/signup", loginSignup.SIGNUP);
app.get("/refresh", handleRefreshToken);
app.get("/user_data", authorised, UserControler.getUserData);
app.get("/getliveBet", matchControler.getLiveBets);
app.post("/placeBet", authorised, matchControler.placeBet);
app.get("/ongoingBet", authorised, matchControler.getOngoingBets);
app.post("/create_account", authorised, UserControler.create_account);
app.post("/deleteBet", authorised, matchControler.deleteBet);
app.get("/getBetHistory", authorised, matchControler.getHistoryBets);
