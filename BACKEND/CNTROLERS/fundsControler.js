const { FUNDS, USER } = require("../MODALS/db");
const { errorLogger } = require("../MIDDLEWARE/errorLogger");
const { mongoose } = require("../IMPORTS/imports");
const crypto = require("crypto");

class fundsControler {
  static getFunds = async (REQ, RES) => {
    if (!REQ.PHONE_NUMBER)
      return RES.status(401).json({ status: "login", message: "login again" });
    try {
      let res = await FUNDS.find({ phoneNumber: REQ.PHONE_NUMBER });
      if (!res) throw new Error("nothing found");
      return RES.status(200).json({ status: "ok", data: res });
    } catch (error) {
      if (!error.message) errorLogger(0, "fundsControler -> getfunds", error);
      return RES.status(403).json({
        status: "err",
        message: error.message || "something went wrong",
      });
    }
  };

  static withdraw = async (REQ, RES) => {
    if (!REQ.PHONE_NUMBER)
      return RES.status(401).json({ status: "login", message: "login again" });
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      let { amount } = REQ.body;
      if (!amount || parseFloat(amount) < 100)
        throw new Error("Enter a valid data");

      //check if bank account exists;
      await USER.validate();
      // convert the amount to paise form and check if the user has the amout to process the request or not
      amount = parseFloat(amount).toFixed(2) * 100;

      let is_deducted = await USER.findOneAndUpdate(
        {
          phoneNumber: REQ.PHONE_NUMBER,
          balance: { $gte: parseFloat(amount) },
        },
        {
          $inc: {
            balance: -parseFloat(amount),
            withdrawAmount: parseFloat(amount),
            withdrawCount: 1,
          },
        },
        { new: true }
      );
      let transactionId = crypto.randomBytes(8).toString("hex");
      let is_fundCreated = await FUNDS.create({
        phoneNumber: REQ.PHONE_NUMBER,
        amount,
        date: getParsedDate(),
        time: getParsedTime(),
        type: "WITHDRAW",
        transactionId: transactionId,
      });
      if (!is_deducted || !is_fundCreated)
        throw new Error("Low amount or something went wrong");

      //   #TODO
      // create a email sending function and send a email for the withdrawal;

      await session.save();
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      if (!error?.message) errorLogger(0, "fundsControler -> withdraw", error);
      if (error?.message)
        return RES.status(400).json({ status: "err", message: error.message });
      if (error?.code === 11000)
        return RES.status(409).json({
          status: "err",
          message: "record already exists",
        });
      if (error?.code === 72 || error?.code === 53)
        return RES.status(400).json({
          status: "err",
          message: "incorrect data",
        });
      return RES.status(500).json({
        status: "err",
        message: "Smething went wrong",
      });
    }
  };
}

module.exports = { fundsControler };

// function returns data in dd/mm/yyy format
function getParsedDate() {
  let today = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Calcutta",
    })
  );
  return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
}

function getParsedTime() {
  let today = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Calcutta",
    })
  );
  return `${
    today.getHours() < 10 ? "0" + today.getHours() : today.getHours()
  }:${today.getMinutes()}`;
}
