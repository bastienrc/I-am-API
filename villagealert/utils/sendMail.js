import nodemailer from 'nodemailer'

// create reusable transporter object using the default SMTP transport
export default (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_HOST_USER, // generated ethereal user
      pass: process.env.EMAIL_HOST_PASSWORD // generated ethereal password
    }
  })

  // send mail with defined transport object
  const info = transporter.sendMail({
    from: process.env.EMAIL_HOST_USER,
    to: 'malfredmalfred@yahoo.fr', // list of receivers
    subject: 'Alerte' // Subject line
  })

  console.log('Message sent: %s', info.messageId)
}
