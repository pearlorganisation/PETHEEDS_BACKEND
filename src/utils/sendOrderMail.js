import nodemailer from 'nodemailer'
import ejs from "ejs"
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const sendOrderMail = async (email, orderId ,amount, date, paymentType) => {
    // transporter - configuration of admin/user to send mail from
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_APP_PASSWORD,
      },
    });
    const templatePath = path.join(__dirname, `../../views/orderMail.ejs`);

    let data = await ejs.renderFile(templatePath, { email, orderId, amount, date ,paymentType});

 let   mailOptions = {
        from: "avnish@pearlorganisation.com",
        to: [email,process.env.NODEMAILER_EMAIL],
        subject: "Your Petheeds Order Confirmation",
        html: data,
      };


      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return reject(error);
          } else {
            return resolve("Order Mail Sent Successfully" + info.response);
          }
        });
      });
}