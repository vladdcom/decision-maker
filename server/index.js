const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRouter = require("./auth/routes");
const userInfoRouter = require("./userInfo/routes");

const PORT = process.env.PORT || 5000;

const app = express();

// MIDDLEWARES
app.use(cookieParser());
app.use("/", express.static(path.resolve(__dirname, "..", "dist")));

app.use("/api/auth", authRouter);
app.use("/api/userInfo", userInfoRouter);

// static
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "dist"));
});

// catch unhandled routes
app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log("server start");
});
