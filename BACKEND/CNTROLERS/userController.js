const { errorLogger } = require("../MIDDLEWARE/errorLogger");
const { USER } = require("../IMPORTS/imports");
class UserControler {
  static getUserData = async (REQ, RES) => {
    if (!REQ.PHONE_NUMBER)
      return RES.status(403).json({ status: "err", message: "login again !" });
    try {
      // #TODO
      //  CHANGE THE spellingof invitation code

      let user_info = await USER.findOne(
        { phoneNumber: REQ.PHONE_NUMBER },
        {
          _id: 0,
          phoneNumber: 1,
          balance: 1,
          invitaitonCode: 1,
          accountDetails: 1,
        }
      );
      if (!user_info)
        return RES.status(401).json({
          status: "login",
          message: "login again!",
        });
      return RES.status(200).json({ status: "ok", data: user_info });
    } catch (error) {
      errorLogger(error?.code, "userControler", error?.message || error);
      return RES.status(500).json({
        status: "err",
        message: "something went wrong",
      });
    }
  };

  static create_account = async (REQ, RES) => {
    if (!REQ.PHONE_NUMBER)
      return RES.status(401).json({
        status: "login",
        message: "login again !!",
      });

    try {
      const { account_number, ifsc_code, name, withdraw_pass } = REQ.body;
      if (!account_number || !ifsc_code || !name || !withdraw_pass)
        throw new Error("All the details are required");

      // checking if the account already exists.
      let ac_exist = await USER.findOne({
        "accountDetails.account_number": account_number,
      });
      if (ac_exist) throw new Error("Account details already exists");

      const updated_user = await USER.findOneAndUpdate(
        { phoneNumber: REQ.PHONE_NUMBER },
        { $set: { accountDetails: { ...REQ.body } } }
      );

      if (updated_user)
        return RES.status(201).json({
          status: "ok",
          message: "Account details added",
        });
      else throw new Error("something went wrong");
    } catch (error) {
      return RES.send({ status: "err", message: error.message });
    }
  };
}

module.exports = { UserControler };
