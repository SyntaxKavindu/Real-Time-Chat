import { mailtrapClient, sender } from '../utilities/mailTrap.config.js';

// Email Templates
import { VERIFICATION_EMAIL_TEMPLATE } from "./templates/emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        // Recipient
        const recipients = [{ email }];

        // send verification email
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Verify your email address",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Verification Email",
        });

        console.log("Verification email sent successfully:", response);

    } catch (error) {
        console.error("Error sending verification email:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};