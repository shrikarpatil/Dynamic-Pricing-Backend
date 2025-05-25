const transporter = require("./mailer"); 
const { Users } = require("../models");

const PasswordResetBody = (payload) => {
  const { firstname, lastname, link, sent_by } = payload;
  return `
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p>Dear ${firstname}${lastname ? ` ${lastname}` : ""},</p>
          <p>Please click on the following link to set your new password:</p>
          <p>         
            <a class="btn btn-primary" href="${link}">Reset your password</a>
          </p>
          <p>Thank you,<br />${sent_by}</p>
        </div>
      </div>
    </div>
  `;
};

const sendEmail = async (type, payload) => {
  const { to, link, sent_by } = payload;

  if (!to || !link || !sent_by)
    throw new Error("Missing required fields in payload");

  const user = await Users.findOne({ where: { email: to } });
  if (!user) throw new Error("User not found");

  let mailOptions;
  if (type === "password_reset") {
    mailOptions = {
      from: `Dynamic Pricing Engine Support <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "Password Reset Link",
      html: PasswordResetBody({
        firstname: user.firstname,
        lastname: user.lastname,
        link,
        sent_by,
      }),
    };
  } else {
    throw new Error("Unsupported email type");
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};

module.exports = sendEmail;
