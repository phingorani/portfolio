import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Please fill out all fields.' }, { status: 400 });
  }

  // IMPORTANT: Replace with your own email configuration.
  // It is highly recommended to use environment variables for this sensitive information.
  // Example for .env.local:
  //
  // EMAIL_HOST=smtp.example.com
  // EMAIL_PORT=587
  // EMAIL_USER=your_email@example.com
  // EMAIL_PASS=your_app_password
  // EMAIL_TO=recipient_email@example.com

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`, // sender address
    to: process.env.EMAIL_TO, // list of receivers
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`, // Subject line
    text: message, // plain text body
    html: `<p>You have a new contact form submission from:</p>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong></p>
           <p>${message.replace(/\n/g, '<br>')}</p>`, // html body
  };

  try {
    // Verify connection configuration
    await transporter.verify();
    // Send mail
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'There was an error sending your message. Please try again later.' }, { status: 500 });
  }
}
