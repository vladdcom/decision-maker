const express = require("express");
const axios = require("axios");
const cookieParser = require("cookie-parser");
const queryString = require("query-string");

const app = express();

const clientId = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

// middlewares
app.use(cookieParser());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

//routes
app.get("/api/userInfo", function(req, res) {
  const { cookies: { access_token } = {} } = req;

  const authToken = `token ${access_token}`;

  return axios("https://api.github.com/user", {
    headers: {
      Authorization: authToken
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(err => res.sendStatus(401));
});

app.get("/api/auth/try", function(req, res) {
  const { cookies: { access_token } = {} } = req;

  // TODO validate token
  if (access_token) {
    return res.sendStatus(200);
  }
  return res.sendStatus(401);
});

app.get("/api/auth/out", function(req, res) {
  res.clearCookie("access_token");
  res.sendStatus(200);
});

app.get("/api/auth", function(req, res) {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost:5000/api/auth/continue`
  );
});

app.get("/api/auth/continue", function(req, res) {
  const { code = "" } = req.query;

  axios({
    method: "POST",
    url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${client_secret}&code=${code}`
  })
    .then(response => {
      const { access_token = "" } = queryString.parse(response.data);
      res.cookie("access_token", access_token, {
        httpOnly: true
      });
      res.redirect("http://localhost:8080");
    })
    .catch(() => {
      res.redirect("http://localhost:8080?error=someErrorMessage");
    });
});

app.listen(5000, () => {
  console.log("server start");
});
