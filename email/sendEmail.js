import transporter from "../config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE , PASSWORD_RESET_TEMPLATE} from "../config/emailTemplates.js";

export const sendWelcomeEmail = async (name, email) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL, // Must be verified in Brevo
      to: email,
      subject: "🎉 Welcome to MERNStack – Let’s Build Something Amazing!",
      text: `Hi ${name},

Welcome to MERNStack! We're thrilled to have you on board. 🎉

You’re now part of a community that thrives on innovation, learning, and collaboration. Whether you’re here to build projects, expand your skills, or connect with like-minded developers, we’re here to support you every step of the way.

🚀 What's Next?
- Explore our latest tutorials and resources.
- Start your first MERN project today!
- Join our community to ask questions and share your progress.

💡 Ready to get started?  
👉 [Start Your First Project](https://your-mern-tutorial-link.com)  
👉 [Join Our Community](https://your-community-link.com)  

If you have any questions, feel free to reach out—we’re happy to help!

Happy coding! 💻✨

Best regards,  
The MERNStack Team`,
      html: `<p>Hi <strong>${name}</strong>,</p>
                   <p>🎉 <strong>Welcome to MERNStack!</strong> We're thrilled to have you on board.</p>
                   <p>You’re now part of a community that thrives on innovation, learning, and collaboration. Whether you’re here to build projects, expand your skills, or connect with like-minded developers, we’re here to support you every step of the way.</p>

                   <h3>🚀 What's Next?</h3>
                   <ul>
                       <li>🔍 Explore our latest <strong>tutorials and resources</strong>.</li>
                       <li>🛠️ Start your first <strong>MERN project</strong> today!</li>
                       <li>💬 Join our <strong>community</strong> to ask questions and share your progress.</li>
                   </ul>

                   <h3>💡 Ready to get started?</h3>
                   <p>
                       👉 <a href="https://your-mern-tutorial-link.com" target="_blank"><strong>Start Your First Project</strong></a><br/>
                       👉 <a href="https://your-community-link.com" target="_blank"><strong>Join Our Community</strong></a>
                   </p>

                   <p>If you have any questions, feel free to reach out—we’re happy to help!</p>
                   <p>Happy coding! 💻✨</p>

                   <p>Best regards,<br/>The <strong>MERNStack Team</strong></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email successfully sent to ${email}`);
    return { success: true, msg: "Email sent successfully." };

  } catch (error) {
    console.error("❌ Error sending welcome email:", error.message);
    return { success: false, msg: "Failed to send Email." };
  }
};


export const sendOtpOnEmail = async (otp, email) => {
    try {
        const mailOptions = {
            from: process.env.SENDER_EMAIL, // Ensure this email is verified in Brevo
            to: email, // Use the passed email argument
            subject: "🔐 Account Verification OTP",
            text: `Your OTP is ${otp}. Verify your account using this OTP.`,
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",email)
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ OTP successfully sent to ${email}`);
        return { success: true, msg: "OTP sent successfully." };

    } catch (error) {
        console.error("❌ Error sending OTP email:", error.message);
        return { success: false, msg: "Failed to send OTP." };
    }
};

export const sendResetOtpOnEmail = async (otp, email) => {
    try {
        // Email options
        const mailOptions = {
            from: process.env.SENDER_EMAIL, // Ensure this is verified in Brevo
            to: email,
            subject: "🔐 Reset Your Password – OTP Verification",
            text: `Your OTP for resetting your password is ${otp}. This OTP is valid for 15 minutes.`,
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",email)
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Password reset OTP successfully sent to ${email}`);
        return { success: true, msg: "Password reset OTP sent successfully." };

    } catch (error) {
        console.error("❌ Error sending OTP email:", error.message);
        return { success: false, msg: "Failed to send reset OTP." };
    }
};


