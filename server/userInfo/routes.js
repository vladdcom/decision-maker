const express = require("express");
const axios = require("axios");

const userInfoRouter = express.Router();

userInfoRouter.get("/", (req, res) => {
  const { cookies: { access_token: accessToken } = {} } = req;

  if (!accessToken) return res.sendStatus(401);
  const authToken = `token ${accessToken}`;

  return axios("https://api.github.com/user", {
    headers: {
      Authorization: authToken
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(() => res.sendStatus(400));
});

module.exports = userInfoRouter;
