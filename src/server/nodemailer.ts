const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NEXT_APP_EMAIL_AUTH,
    pass: process.env.NEXT_APP_PASSWORD_AUTH,
  },
});

export default transporter;
