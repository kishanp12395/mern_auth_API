import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // TLS is used when secure is false on port 587
    auth: {
        user: process.env.SMTP_USER, // Ensure this matches your Brevo SMTP credentials
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false, // Helps avoid issues with self-signed certs
    }
});

// Verify transporter connection (useful for debugging)
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ SMTP Connection Failed:', error);
    } else {
        console.log('✅ SMTP Connected Successfully', success);
    }
});

export default transporter;
