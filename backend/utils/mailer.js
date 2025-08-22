const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "noreply.buttnetworks@gmail.com",
        pass: "xdwwerqfynnslgxz", // <-- App Password (looks correct)
    },
});
module.exports = transporter;
