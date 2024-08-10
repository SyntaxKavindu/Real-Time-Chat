import { MailtrapClient } from "mailtrap";
import "dotenv/config";

export const mailtrapClient = new MailtrapClient({ endpoint: process.env.MAILTRAP_ENDPOINT, token: process.env.MAILTRAP_TOKEN });

export const sender = {
    email: "mailtrap@kavinduchamath.com",
    name: "Mailtrap Test",
};
