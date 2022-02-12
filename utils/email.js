const pug = require("pug");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, username, token) => {
  const msg = {
    to: email, // Change to your recipient
    from: "janishnehyan03@gmail.com", // Change to your verified sender
    subject: "Mern Email verification",
    text: "Message in text",
    html: pug.renderFile(`${__dirname}/../views/email/welcome.pug`, {
      username: username,
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

const sendResetPasswordEmail = (email,token) => {
  const msg = {
    to: email, // Change to your recipient
    from: "janishnehyan03@gmail.com",
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
  sendWelcomeEmail,
  sendResetPasswordEmail,
};
