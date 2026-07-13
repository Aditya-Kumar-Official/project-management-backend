import mailgen from 'mailgen';
import nodemailer from 'nodemailer';

const sendMail = async function (options) {
  const mailGenerator = new mailgen({
    theme: 'default',
    product: {
      name: 'Project Management',
      link: 'http://localhost:3000',
    },
  });
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MailtrapHost,
    port: process.env.MailtrapPort,
    auth: {
      user: process.env.MailtrapUser,
      pass: process.env.MailtrapPass,
    },
  });

  const mail = {
    from: process.env.MailtrapUser,
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (err) {
    console.log('Email not sent', err);
  }
};

const emailVerificationMailgenContent = (userName, verificationUrl) => {
  return {
    body: {
      name: userName,
      intro:
        "Welcome to Project Management! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with your account, please click here:',
        button: {
          color: '#22BC66',
          text: 'Confirm your account',
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailgenContent = (userName, resetPasswordUrl) => {
  return {
    body: {
      name: userName,
      intro:
        'You have requested to reset your password. Please click the button below to reset your password.',
      action: {
        button: {
          color: '#DC4D2F',
          text: 'Reset your password',
          link: resetPasswordUrl,
        },
      },
      outro:
        'If you did not request a password reset, please ignore this email or reply to let us know. This password reset link is only valid for the next 24 hours.',
    },
  };
};

export {
  sendMail,
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
};
