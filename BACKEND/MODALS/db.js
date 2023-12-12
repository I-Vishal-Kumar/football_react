const mongoose = require("mongoose");

const schema = mongoose.Schema;

//  # NOTE
//  User amount is saved in paise for floating point precesion errors;
const userSchema = new schema({
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  betPlayed: {
    type: Number,
    default: 0,
  },
  invitationCode: {
    type: Number,
    default: 0,
    required: true,
  },
  accountDetails: {
    account_number: { type: String },
    ifsc_code: { type: String },
    name: { type: String },
    withdraw_pass: { type: String },
  },
  refreshToken: {
    type: String,
    required: true,
  },
  withdrawAmount: {
    type: Number,
    default: 0,
  },
  withdrawCount: {
    type: Number,
    default: 0,
  },
});

const betSchema = new schema({
  id: { type: Number, required: true },
  amount: { type: Number, required: true },
  leagueName: { type: String, required: true },
  team_a: { type: String, required: true },
  team_b: { type: String, required: true },
  raw_date: { type: String, required: true },
  parent: { type: Number, required: true },
  phoneNumber: { type: Number, required: true },
  score: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  percent: { type: String, required: true },
  status: { type: Number, required: true }, //0->pending 1->success 2->canceled
});

const matchSchema = new schema({
  data: { type: String, default: "0" },
  version: { type: Number, default: 0 },
});

const fundsSchema = new schema({
  type: { type: String, required: true },
  status: { type: Number, default: 0 },
  amount: { type: Number, requried: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  transactionId: { type: String, requried: true, uinique: true },
  phoneNumber: { type: String, requried: true },
});

const profitSchema = new schema({
  type: { type: String, required: true },
  amount: { type: Number, requried: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

matchSchema.pre("findOneAndUpdate", function (next) {
  this._update.$inc = this._update.$inc || {};
  this._update.$inc.version = 1;
  next();
});

userSchema.path("balance").validate(function (balance, response) {
  if (value > 0 && this.accountDetails) {
    response(false, "Account details are required");
  } else {
    response(true);
  }
}, null);
const BET = new mongoose.model("BET", betSchema);
const USER = new mongoose.model("USER", userSchema);
const MATCHES = new mongoose.model("MATCHES", matchSchema);
const FUNDS = new mongoose.model("FUNDS", fundsSchema);
const PROFITS = new mongoose.model("PROFITS", profitSchema);
module.exports = { USER, MATCHES, BET, FUNDS, PROFITS };
