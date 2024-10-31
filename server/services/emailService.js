const nodemailer = require('nodemailer');
const createHttpError = require('http-errors');

// https://myaccount.google.com/apppasswords
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dshagde66wewedhs@gmail.com',
    pass: 'tajr hedn iphv ryyp',
  },
});

const sendEmail = async (mailOptions, next) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        next(createHttpError(400, 'Email not sent!'));
        return reject(err);
      }
      console.log('Message sent: %s', info.messageId);
      resolve();
    });
  });
};

module.exports = {
  sendEmail,
};



// mailOptions example
/*

const mailOptions = {
      from: '"Support" <no-reply@parking.inspection>',
      to: user.email,
      subject: 'Password Reset',
      text: `Click the link to reset your password: ${resetLink}. This link will expire in ${RESET_EXPIRES_TIME}.`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p><p>This link will expire in ${RESET_EXPIRES_TIME}.</p>`,
};

*/