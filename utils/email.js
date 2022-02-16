const pug = require("pug");
const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv");
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const sendRegistrationEmail = (email, username, token) => {
  const accessToken = oauth2Client.getAccessToken();
  const msg = {
    to: email, // Change to your recipient
    from: "nehyanjanish@gmail.com", // Change to your verified sender
    subject: "Mern Email verification",
    text: "Message in text",
    html: `<a href="${token}">Click here to verify your email</a>`,
  };
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "nehyanjanish@gmail.com",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
  transporter.sendMail(msg, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent ");
    }
  });
};
const sendResetPasswordEmail = (email, token) => {
  const msg = {
    to: email, // Change to your recipient
    from: "nehyanjanish@gmail.com",
    subject: "Mern Email verification",
    text: "Message in text",
    html: pug.renderFile(`${__dirname}/../views/email/resetPassword.pug`, {
      email: email,
      token: token,
    }),
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  sendResetPasswordEmail,
  sendRegistrationEmail,
};
