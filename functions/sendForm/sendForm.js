const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);

    // Log the value of the timezone property
    console.log('Time zone:', data.timezone);

    // Set the timestamp to the current time in the user's local time zone
    const now = new Date();
    const timezone = data.timezone || 'UTC'; // fallback to UTC if no timezone is provided
    const options = { timeZone: timezone };
    const timestamp = now.toLocaleString('en-US', options);

    // Update the data with the timestamp
    data.timestamp = timestamp;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'youremail@example.com',
      to: data.recipientEmail,
      subject: `Bitvoice from ${data.senderContact}`,
      html: `
        <p><strong>Sender Contact Information:</strong> ${data.senderContact}</p>
        <p><strong>Invoice Description:</strong> ${data.invoiceDescription}</p>
        <p><strong>Currency:</strong> ${data.unitType}${data.unitsInvoiced}</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
