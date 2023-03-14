import { useState } from 'react'
import './App.css'
<<<<<<< Updated upstream
import { send } from 'emailjs-com'
import { useHistory } from 'react-router-dom'
=======
import emailjs from '@emailjs/browser'
import React, { useRef } from 'react';
>>>>>>> Stashed changes


export default function App() {

const form = useRef();

<<<<<<< Updated upstream
  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };
  
  const history = useHistory();

  function onSubmit(e) {
    e.preventDefault();
    send('Bitvoice', 'template_efo3bp2', toSend, 'wFHLTcghtNMJbuPQZ')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        history.push('/receipt', { toSend });
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
  }
=======
  const sendEmail = (e) => {
    e.preventDefault();
>>>>>>> Stashed changes

    emailjs.sendForm('default_service', 'template_efo3bp2', form.current, 'wFHLTcghtNMJbuPQZ')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div className="App">
      <main>
        <h1>Email Form</h1>
        <form ref={form} onSubmit={sendEmail}>
          <label htmlFor="recipientEmail">Recipient Email Address:</label>
          <input type="email" 
          id="recipientEmail" 
          name="recipientEmail"
          required />

          <label htmlFor="senderContact">Sender Contact Information:</label>
          <input type="text" 
          id="senderContact" 
          name="senderContact" 
          required />

          <label htmlFor="unitsInvoiced">Units Invoiced:</label>
          <input type="number" 
          id="unitsInvoiced" 
          name="unitsInvoiced" 
          required />

          <label htmlFor="invoiceDescription">Invoice Description:</label>
          <textarea id="invoiceDescription" 
          name="invoiceDescription" 
          required></textarea>

          <input type="submit" value="Send!" />
        </form>
      </main>
    </div>
  )
}

