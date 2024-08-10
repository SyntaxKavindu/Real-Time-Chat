import { mailtrapClient, sender } from '../utilities/mailTrap.config.js';

// Email Templates
import { VERIFICATION_EMAIL_TEMPLATE } from "./templates/emailTemplates.js";

// Send Verification Email
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

// Send Welcome Email
export const sendWelcomeEmail = async (email, fullname) => {
    try {
        // Recipient
        const recipients = [{ email }];

        // send verification email
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            template_uuid: "d5064bb5-54d4-4a59-aaba-049f49ec9b7d",
            template_variables: {
                "company_info_name": "Syntax Chat Team",
                "name": fullname,
            }
        });

        console.log("Welcome email sent successfully:", response);

    } catch (error) {
        console.error("Error sending welcome email:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};