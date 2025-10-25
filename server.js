import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}))
app.use(express.json())

// Konfigurace SMTP pro Seznam
const transporter = nodemailer.createTransport({
  host: 'smtp.seznam.cz',
  port: 465,
  secure: true, // SSL/TLS
  auth: {
    user: 'info@wloom.eu',
    pass: 'vokhot-nigvub-vAvfy2'
  }
})

// Endpoint pro odesílání emailů
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body

    // HTML template pro email
    const htmlTemplate = `
      <h2>Nova poptavka z wloom.eu</h2>
      <p><strong>Jmeno:</strong> ${name || 'Nezadano'}</p>
      <p><strong>Email:</strong> ${email || 'Nezadano'}</p>
      <p><strong>Telefon:</strong> ${phone || 'Nezadano'}</p>
      <p><strong>Predmet:</strong> ${subject || 'Nezadano'}</p>
      <p><strong>Zprava:</strong></p>
      <p>${(message || '').replace(/\n/g, '<br>')}</p>
    `

    const mailOptions = {
      from: 'info@wloom.eu',
      to: 'info@wloom.eu',
      subject: `Poptavka z wloom.eu - ${subject || 'Bez predmetu'}`,
      html: htmlTemplate,
      replyTo: email
    }

    await transporter.sendMail(mailOptions)
    res.json({ success: true })
  } catch (error) {
    console.error('Chyba pri odesilani emailu:', error)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`)
})
