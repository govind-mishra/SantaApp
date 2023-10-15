// emailSender.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter using your email service provider's settings (e.g., Gmail).
const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS, EMAIL_PORT } = process.env;
const transporter = nodemailer.createTransport({
    host: EMAIL_SERVICE,
    port: EMAIL_PORT,
    secure: false,// true for 465, false for other ports
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    }
});

// Function to send emails
function sendEmail({ username, address, wish }) {
    let emailText = 'Pending Requests:\n\n';
    emailText += `Child: ${username}\n`;
    emailText += `Address: ${address}\n`;
    emailText += `Request: ${wish}\n\n`;
    // Logic to fetch pending requests and format email content
    try {
        const mailOptions = {
            from: 'do_not_reply@northpole.com',
            to: 'santa@northpole.com',
            subject: 'Pending Requests',
            text: emailText,
        };

        transporter.verify((err, success) => {
            if (err) console.error(err);
            console.log('Your config is correct', transporter.options.host);
        });
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Email sending failed:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.error('An error occurred while sending the email:', error);
    }
}

module.exports = {
    sendEmail,
};
