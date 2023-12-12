const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const schedule = require("node-schedule");
const mongoose = require("mongoose");
const fsPromis = require("fs").promises;
const path = require("path");
const moment = require("moment-timezone");
const fs = require("fs");
const { USER, MATCHES, BET } = require("../MODALS/db");

module.exports = {
  JWT,
  bcrypt,
  schedule,
  USER,
  mongoose,
  fsPromis,
  path,
  fs,
  moment,
  MATCHES,
  BET,
};
