import nodemailer from "nodemailer";

export const sendEmailUtility = async (emailTo, emailText, emailSubject) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "plabon439@gmail.com",
            pass: "vxnolktzqscotycs"
        }
    });
     let mailOptions = {
         from: 'Inventory Management <plabon439@gmail.com>',
         to: emailTo,
         subject: emailSubject,
         text: emailText,
     }
     return await transporter.sendMail(mailOptions);
}
