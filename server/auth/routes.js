const express = require("express");
const axios = require("axios");
const queryString = require("query-string");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost:5000/api/auth/continue`
  );
});

authRouter.get("/continue", (req, res) => {
  const { code = "" } = req.query;

  axios({
    method: "POST",
    url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`
  })
    .then(response => {
      const { access_token = "" } = queryString.parse(response.data);

      res.cookie("access_token", access_token, {
        httpOnly: true
      });
      res.redirect("/");
    })
    .catch(() => {
      res.redirect("/?error=someErrorMessage");
    });
});

authRouter.get("/out", (req, res) => {
  res.clearCookie("access_token");
  res.sendStatus(200);
});

module.exports = authRouter;
