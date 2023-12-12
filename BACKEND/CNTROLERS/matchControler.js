const {
  moment,
  mongoose,
  schedule,
  USER,
  BET,
  MATCHES,
} = require("../IMPORTS/imports");

const { errorLogger } = require("../MIDDLEWARE/errorLogger");
const { config } = require("../CONFIG/config");
const id = "65697b4eb6b104f0f3239227";

class matchControler {
  static getLiveBets = async (REQ, RES) => {
    try {
      let current_version = await MATCHES.findOne(
        { _id: id },
        { _id: 0, version: 1 }
      );
      let matches = await getMatch(parseInt(current_version?.version) || 2, id);
      if (!matches || matches?.data?.length < 30) {
        current_version = await MATCHES.findOne(
          { _id: id },
          { _id: 0, version: 1 }
        );
        matches = await getMatch(parseInt(current_version?.version) || 3, id);
      }

      if (!matches || matches?.data?.length < 30) {
        await createLiveMatches();
        matches = await getMatch(parseInt(current_version?.version + 1), id);
      }
      if (matches?.data) {
        return RES.status(200).json({ status: "ok", data: matches?.data });
      } else {
        return RES.status(401).json({ status: "err", message: "not found" });
      }
    } catch (error) {
      errorLogger(error?.code || 0, "matchControler", error);
      return RES.status(500).json({
        status: "err",
        message: "something went wrong",
      });
    }
  };

  static placeBet = async (REQ, RES) => {
    if (!REQ.PHONE_NUMBER)
      return RES.status(401).json({
        status: "login",
        message: "Login again !!",
      });
    let {
      id,
      team_a,
      team_b,
      amount,
      leagueName,
      score,
      percent,
      raw_date,
      date,
      time,
    } = REQ.body;
    if (
      !id ||
      !team_a ||
      !team_b ||
      !amount ||
      !leagueName ||
      !percent ||
      !score ||
      !percent ||
      !date ||
      !time ||
      !raw_date
    ) {
      return RES.status(302).json({ status: "err", message: "Invalid data" });
    }
    let today = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Calcutta",
    });
    today = new Date(today);
    let match_date = new Date(
      new Date(raw_date).toLocaleString("en-US", {
        timeZone: "Asia/Calcutta",
      })
    );

    if (match_date.getTime() - today.getTime() < 5 * 60 * 1000)
      return RES.status(402).json({ status: "err", message: "bet time out" });

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      amount = parseFloat(amount * 100).toFixed(2); //amount converted to paise form for floating precesion error

      // get the user data and validate amounts;
      let user_updated = await USER.findOneAndUpdate(
        {
          phoneNumber: REQ.PHONE_NUMBER,
          balance: { $gte: parseFloat(amount) },
        },
        {
          $inc: {
            balance: -parseFloat(amount),
          },
        },
        { new: true, session }
      );
      if (!user_updated) throw new Error("Low balance or user not found");

      //find for the existing bet
      let bet_exists = await BET.findOne({
        id: id,
        phoneNumber: REQ.PHONE_NUMBER,
      });
      if (bet_exists) throw new Error("Bet already exists.");
      let parent = user_updated.get("parent");
      const newBet = await BET.create(
        [
          {
            id,
            team_a,
            team_b,
            amount: amount,
            leagueName,
            date,
            time,
            score,
            percent,
            raw_date,
            amount: amount,
            phoneNumber: REQ?.PHONE_NUMBER,
            parent: parent || 0,
            status: 0,
          },
        ],
        { session }
      );

      if (newBet) {
        await session.commitTransaction();
      } else {
        throw new Error("something went wrong");
      }
      return RES.status(200).json({ status: "ok", message: "Bet Placed..." });
    } catch (error) {
      await session.abortTransaction();
      return RES.status(400).json({
        status: "err",
        message: error.message || "something went wrong",
      });
    } finally {
      session.endSession();
    }
  };

  static deleteBet = async (REQ, RES) => {
    if (!REQ.PHONE_NUMBER)
      return RES.status(401).json({
        status: "err",
        message: "something went wrong",
      });
    let { raw_date, id } = REQ.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      if (!raw_date || !id) throw new Error("something went wrong");
      // check for the valid time
      let timeDifference = new Date(raw_date).getTime() - new Date().getTime();
      // if (timeDifference && timeDifference < 5 * 60 * 1000)
      //   throw new Error("Bet deletion time out");

      // delete the bet;

      let is_deleted = await BET.findOneAndDelete(
        {
          id,
          phoneNumber: REQ.PHONE_NUMBER,
        },
        { session }
      );

      if (!is_deleted) throw new Error("cannot delete bet");
      let amount = Number(is_deleted.get("amount"));

      let updated_user = await USER.findOneAndUpdate(
        { phoneNumber: REQ.PHONE_NUMBER },
        {
          $inc: {
            balance: amount,
            // betPlayed: -1,
          },
        },
        { session }
      );

      if (!updated_user) throw new Error("no user to update");
      await session.commitTransaction();
      return RES.status(200).json({ status: "ok", message: "Deleted" });
    } catch (error) {
      await session.abortTransaction();
      if (!error.message)
        errorLogger(0, "match controler -> delete bet", error);
      return RES.status(405).json({
        status: "err",
        message: error.message || "something went wrong",
      });
    } finally {
      session.endSession();
    }
  };

  static getHistoryBets = async (REQ, RES) => {
    if (!REQ.PHONE_NUMBER)
      return RES.status(401).json({ status: "login", message: "login again" });

    try {
      let bets = await BET.find({
        phoneNumber: REQ.PHONE_NUMBER,
        status: { $gt: 0 },
      });
      if (!bets)
        return RES.status(202).json({
          status: "err",
          message: "no bets found",
        });
      return RES.status(200).json({ status: "ok", data: bets });
    } catch (error) {
      if (!error.message)
        errorLogger(0, "matchControler -> history bets", error);
      return RES.status(403).json({ status: "err", message: error.message });
    }
  };

  static getOngoingBets = async (REQ, RES) => {
    if (!REQ.PHONE_NUMBER)
      return RES.status(401).json({ status: "login", message: "login again" });

    try {
      let bets = await BET.find({
        phoneNumber: REQ.PHONE_NUMBER,
        status: 0,
      });
      if (!bets)
        return RES.status(202).json({
          status: "err",
          message: "no bets found",
        });
      return RES.status(200).json({ status: "ok", data: bets });
    } catch (error) {
      if (!error.message)
        errorLogger(0, "matchControler -> history bets", error);
      return RES.status(403).json({ status: "err", message: error.message });
    }
  };
}

module.exports = { matchControler };

async function getMatch(version, id) {
  return await MATCHES.findOne({ _id: id, version: version });
}

// function that will update the match data in the database:-
async function createLiveMatches() {
  console.log("created");
  let today = getDate();
  today = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(today);
  today = today.split("/");
  let parsed_date = `${today[2]}-${today[1]}-${today[0]}`;

  try {
    let searchParams = new URLSearchParams({
      date: `${parsed_date}`,
      status: "NS",
    });
    let res = await fetch(
      `https://v3.football.api-sports.io/fixtures?${searchParams}`,
      {
        method: "get",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-apisports-key": process.env.LIVE_MATCH_KEY,
        },
      }
    );
    if (res) {
      res = await res.json();
      if (!res?.response) return false;
      res.response.forEach((element) => {
        element["percentages"] = [];
        for (let i = 0; i < 17; i++) {
          element["percentages"].push((Math.random() * 5 + 1).toFixed(2));
        }
      });
      let data = JSON.stringify(res?.response);
      if (!data) return false;
      await MATCHES.findOneAndUpdate({ _id: id }, { data: data });
      return true;
    }
  } catch (error) {
    errorLogger(0, "matchControler", error);
    return false;
  }
  return false;
}

function getDate() {
  let nDate = new Date();
  let date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Asia/Calcutta",
  }).format(nDate);
  date = moment.tz(
    date,
    "dddd, MMMM D, YYYY [at] h:mm:ss A [GMT]Z",
    "Asia/Calcutta"
  );
  date = date.toDate();
  return new Date(date);
}

const job = schedule.scheduleJob(
  { hour: 12, minute: 1, tz: "Asia/Calcutta" },
  createLiveMatches
);

process.on("SIGINT", function () {
  schedule.gracefulShutdown();
  process.exit(process.exitCode);
});
