const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { access_token } = require("../config/config");

const authentication = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("unauthorized");
  jwt.verify(token, access_token, (error, user) => {
    if (error) return res.status(401).send(error);
    req.user = user;
    next();
  });
};

module.exports = authentication;
