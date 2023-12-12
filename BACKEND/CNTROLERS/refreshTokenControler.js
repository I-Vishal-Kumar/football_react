const { JWT, USER } = require("../IMPORTS/imports");

async function handleRefreshToken(req, res) {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(401);
  const refreshToken = cookie.jwt;
  const foundUser = await USER.findOne({ refreshToken: cookie.jwt });
  if (!foundUser) return res.sendStatus(403);

  JWT.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err || decoded.phoneNumber !== foundUser.phoneNumber)
      return res.sendStatus(403);

    const accessToken = JWT.sign(
      {
        phoneNumber: decoded.phoneNumber,
      },
      process.env.ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    return res.status(201).json({ accessToken });
  });
}

module.exports = { handleRefreshToken };
