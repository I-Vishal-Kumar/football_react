const { USER, JWT, bcrypt } = require("../IMPORTS/imports");
const { errorLogger } = require("../MIDDLEWARE/errorLogger");
// const { USER } = require("../MODALS/db");

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
}

module.exports = { loginSignup };
