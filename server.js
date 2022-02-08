const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/info", (req, res) => {
  let requestedWord = req.query.word;
  const options = {
    method: "GET",
    url: `https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${requestedWord}`,
    headers: {
      "x-rapidapi-host": "lingua-robot.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.post("/send", async (req, res) => {
  try {
    const { email, text } = await req.body;
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "example@example.ex",
        pass: "passwordexample",
      },
    });

    let mailOptions = await {
      from: "example@example.ex",
      to: `${email}`,
      subject: `email`,
      text: `${text}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.send("success");
  } catch (error) {
    res.send(error);
  }
});

app.listen(5000);
