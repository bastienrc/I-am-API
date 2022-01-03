import dotenv from 'dotenv'
import { createTestAccount, createTransport, getTestMessageUrl } from 'nodemailer'

// Variables d'environnement
dotenv.config()

// async..await is not allowed in global scope, must use a wrapper
export default async function (from, to, subject, message) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await createTestAccount()

  // create reusable transporter object using the default SMTP transport
  const transporter = createTransport({
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      // user: process.env.EMAIL_HOST_USER, // generated ethereal user
      // pass: process.env.EMAIL_HOST_PASSWORD // generated ethereal password
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: message
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  return 'Preview URL: ' + getTestMessageUrl(info)
}
