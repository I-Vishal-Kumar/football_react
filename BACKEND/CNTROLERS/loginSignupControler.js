const { USER, JWT, bcrypt } = require("../IMPORTS/imports");
const { errorLogger } = require("../MIDDLEWARE/errorLogger");
const fast2sms = require("fast2sms");
const axios = require("axios");

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

class loginSignup {
  static LOGIN = async (req, res) => {
    // res.cookie("jwt", "", { expiresIn: new Date(0) });
    // console.log(req.cookies);
    const { phoneNumber, pass } = req.body;
    if (!phoneNumber || !pass)
      return res
        .status(403)
        .json({ status: "err", message: "All the fields are required !" });

    try {
      const foundUser = await USER.findOne({ phoneNumber });
      if (!foundUser || !(await bcrypt.compare(pass, foundUser.password))) {
        return res
          .status(401)
          .json({ status: "err", message: "invalid credentials !" });
      }

      const access_token = JWT.sign(
        { phoneNumber: foundUser.phoneNumber },
        ACCESS_SECRET,
        { expiresIn: "15m" }
      );
      const refresh_token = JWT.sign(
        { phoneNumber: foundUser.phoneNumber },
        REFRESH_SECRET,
        { expiresIn: "1d" }
      );
      await USER.findOneAndUpdate(
        { phoneNumber: foundUser.phoneNumber },
        {
          refreshToken: refresh_token,
        }
      );
      res.cookie("jwt", refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res
        .status(200)
        .json({ status: "ok", message: "logged in", access_token });
    } catch (error) {
      errorLogger(error?.code, "loginSignup", error?.message || error);
      return res
        .status(500)
        .json({ status: "err", message: "internal server error" });
    }
  };

  static SIGNUP = async (req, res) => {
    let cookies = req.cookies;
    if (!cookies?.otp_token)
      return res.send({ status: "err", message: "something went wrong" });

    if (req?.cookies) {
      Object.keys(req.cookies).forEach((item) => res.clearCookie(item));
    }

    const { pass, otp, phoneNumber, name, invitationCode } = req.body;
    if (!pass || !otp || !phoneNumber || !name)
      return res
        .status(400)
        .json({ status: "err", message: "All fields are required" });

    try {
      if (invitationCode) {
        let is_parent = await USER.findOne({ invitationCode: invitationCode });
        if (!is_parent)
          return res
            .status(403)
            .json({ status: "err", message: "invalid invitation code" });
      } else {
        invitationCode = 0;
      }
      await verifyOtp(cookies.otp_token, phoneNumber, otp);

      // hash the password
      const hashed_pass = await bcrypt.hash(pass, 8);
      // GENERATE THE ACCESS TOKEN AND REFRESH TOKEN
      const access_token = JWT.sign(
        { phoneNumber: phoneNumber },
        ACCESS_SECRET,
        { expiresIn: "10m" }
      );

      // creating the invitation code for the user;
      const user_invitation_code = Math.floor(
        Math.random() * (20000 - 1000) + 1000
      );
      const refresh_token = JWT.sign(
        { phoneNumber: phoneNumber },
        REFRESH_SECRET,
        { expiresIn: "1d" }
      );
      let isCreated = await USER.create({
        password: hashed_pass,
        phoneNumber,
        name,
        parent: invitationCode,
        refreshToken: refresh_token,
        parent: invitationCode,
        invitationCode: user_invitation_code,
      });
      res.cookie("jwt", refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return isCreated
        ? res
            .status(201)
            .json({ status: "ok", message: "created", access_token })
        : res.status(500).json({ message: "failed to create user" });
    } catch (error) {
      if (error?.code === 11000) {
        return res.status(409).json({
          status: "err",
          message: `${
            Object.keys(error?.keyPattern)[0] || "field"
          } already exist`,
        });
      } else if (error?.code === 72 || error?.code === 53) {
        return res.status(409).json({ status: "err", message: "invalid data" });
      } else {
        errorLogger(
          error?.code,
          "loginSignupControler",
          error?.message || error
        );
        return res.status(500).json({ message: "internal server error" });
      }
    }
    // JWT.sign(userName , )
  };

  static getOtp = async (req, res) => {
    let { phoneNumber } = req.body;
    if (!phoneNumber)
      return res.send({ satus: "err", message: "enter a valid phone number" });

    res.clearCookie("otp_token");

    const apiUrl = "https://www.fast2sms.com/dev/bulkV2";
    const apiKey = `${process.env.FAST2SMS_KEY}`;

    const otp = Math.floor(Math.random() * 200000 + 1000);
    console.log(otp);
    const requestData = {
      authorization: `${apiKey}`,
      variables_values: `${otp}`,
      route: "otp",
      numbers: `${phoneNumber}`,
    };

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "cache-control": "no-cache",
        },
        params: requestData,
      });

      if (response?.data?.return === true) {
        let otp_token = JWT.sign({ phoneNumber, otp }, process.env.OTP_SECRET, {
          expiresIn: "2m",
        });
        res.cookie("otp_token", otp_token, { maxAge: 4 * 60 * 1000 });
        return res.send({ status: "ok", message: "otp sent" });
      }
      return res.send({ status: "err", message: "something went wrong" });
    } catch (error) {
      console.log(error);
      errorLogger(error?.code || 1, "loginSignup -> getOtp", error);
      return res.send({ status: "Err", message: "something went wrong" });
    }
  };
}

async function verifyOtp(token, phoneNumber, otp) {
  JWT.verify(token, process.env.OTP_SECRET, (err, decoded) => {
    try {
      if (err) throw new Error("got some error");
      if (
        Number(decoded?.otp) !== Number(otp) ||
        Number(phoneNumber) !== Number(decoded.phoneNumber)
      ) {
        throw new Error("invalid OTP");
      } else {
        return true;
      }
    } catch (error) {
      errorLogger(error?.code || 12, "loginSignup -> verifyOtp", error);
      throw new Error(error?.message || "something went wrong");
    }
  });
}

module.exports = { loginSignup };
