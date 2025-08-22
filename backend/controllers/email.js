const express = require("express");
const router = express.Router();
const transporter = require("../utils/mailer");

router.post("/send-verification", async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    if (req.body.key !== process.env.EMAIL_API_KEY) {
        return res.status(403).json({ message: "Forbidden" });
    }

    const { to, token } = req.body;

    const verificationUrl = `${process.env.FRONTEND_URL}/verify?token=${token}`;
    const safeCompany = "DevBlogs@buttnetworks";
    const safeName = to.split("@")[0] || "User";
    const logoUrl = ""; // or leave as "" if no logo
    const supportEmail = "support@devblogs.com";
    try {
        await transporter.sendMail({
            from: `"DevBlogs" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Verify your DevBlogs account",
            html: `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Verify your email</title>
  <style>
    /* Basic safe styles for many clients */
    body { margin:0; padding:0; -webkit-text-size-adjust:none; -ms-text-size-adjust:none; font-family: "Helvetica Neue", Arial, sans-serif; background:#f4f6fb; }
    .container { width:100%; max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 18px rgba(15,23,42,0.06); }
    .header { padding:22px; text-align:left; }
    .logo { max-height:40px; }
    .content { padding:28px; color:#0f172a; line-height:1.45; }
    h1 { margin:0 0 8px 0; font-size:20px; color:#0f172a; }
    p { margin:12px 0; color:#475569; font-size:15px; }
    .button-wrap { margin:20px 0; text-align:center; }
    .btn { display:inline-block; padding:12px 20px; background:#2563eb; color:#ffffff; border-radius:8px; text-decoration:none; font-weight:600; }
    .muted { color:#94a3b8; font-size:13px; }
    .code { display:inline-block; padding:8px 10px; background:#f1f5f9; border-radius:6px; font-family:monospace; font-size:13px; color:#0f172a; }
    .footer { padding:18px; text-align:center; font-size:12px; color:#9aa4b2; }
    a { color:#2563eb; }
    /* Button fallback for Outlook */
    .btn-table { margin:0 auto; }
    @media (max-width:420px) {
      .content { padding:18px; }
      .header { padding:16px; }
    }
  </style>
</head>
<body>
  <!-- Preheader: shown in inbox preview -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    Verify your email to activate your ${safeCompany} account.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f4f6fb; padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" class="container" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td class="header">
              ${logoUrl ? `<img src="${logoUrl}" alt="${safeCompany} logo" class="logo" />` : `<strong style="font-size:18px;">${safeCompany}</strong>`}
            </td>
          </tr>

          <tr>
            <td class="content">
              <h1>Confirm your email address</h1>
              <p>Hey ${safeName},</p>
              <p>Thanks for creating an account with <strong>${safeCompany}</strong>. Please confirm your email by clicking the button below. This helps us keep your account secure.</p>

              <div class="button-wrap">
                <table role="presentation" cellpadding="0" cellspacing="0" class="btn-table">
                 <tr>
  <td align="center" bgcolor="#2563eb" style="border-radius:8px;">
    <a href="${verificationUrl}" 
       target="_blank" 
       rel="noopener" 
       style="display:inline-block; padding:12px 20px; font-weight:600; color:#fff; text-decoration:none; font-size:16px;">
       Verify Email
    </a>
  </td>
</tr>
                </table>
              </div>

              <p class="muted">If the button doesn't work, copy and paste the link below into your browser:</p>
              <p class="code" style="word-break:break-all;">${verificationUrl}</p>

              <hr style="border:none; border-top:1px solid #eef2ff; margin:22px 0;" />

              <p style="margin:0;">If you didn't create an account or this wasn't you, ignore this email or <a href="mailto:${supportEmail}">contact support</a>.</p>
            </td>
          </tr>

          <tr>
            <td class="footer">
              <div style="margin-bottom:8px;">${safeCompany} • You received this because you created an account with ${safeCompany}.</div>
              <div style="font-size:11px;">Need help? <a href="mailto:${supportEmail}">${supportEmail}</a></div>
              <div style="margin-top:8px; color:#cbd5e1;">© ${new Date().getFullYear()} ${safeCompany}. All rights reserved.</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
        });
        res.json({ message: "Verification email sent" });
    } catch (err) {
        console.error("Email send error:", err);
        res.status(500).json({ message: "Failed to send email" });
    }
});

module.exports = router;
