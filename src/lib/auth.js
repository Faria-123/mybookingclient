import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
// import { resumeAndAbort } from "next/dist/server/app-render/stream-ops.web";
import { Resend } from 'resend';
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("user");

const resend = new Resend(process.env.RESEND_API_KEY);

// export const auth = betterAuth({
//     emailAndPassword: {
//         enabled: true,
//         sendResetPassword: async ({ user, url, token }, request) => {
//             void resend.emails.send({
//                 from: 'Acme <onboarding@example.com>',

//                 to: user.email,
//                 subject: "Reset your password",
//                 text: `Click the link to reset your password: ${url}`,
//             });
//         },
//         database: mongodbAdapter(db, {
//             client,
//         }),
//     });
export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,

        sendResetPassword: async ({ user, url, token }, request) => {
            void resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: user.email,
                subject: "Reset your password",
                html: `
                <p>Click the link to reset your password:</p> 
                Click the link to reset your password: ${url}`,
            });
        },
    },

    database: mongodbAdapter(db, {
        client,
    }),
});