import { useState } from 'react'
import './App.css'
import emailjs from '@emailjs/browser'
import React, { useRef } from 'react';


export default function App() {

const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

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
          <input 
          type="email" 
          id="recipientEmail" 
          name="recipientEmail"
          required />

          <label htmlFor="senderContact">Sender Contact Information:</label>
          <input 
          type="text" 
          id="senderContact" 
          name="senderContact" 
          required />

          <label htmlFor="unitType">Currency</label>
          <select name='unitType'>
            <option>USD $</option>
          </select>


          <label htmlFor="unitsInvoiced">Units Invoiced:</label>
          <input 
          type="number" 
          id="unitsInvoiced" 
          name="unitsInvoiced" 
          required />

          <label htmlFor="invoiceDescription">Invoice Description:</label>
          <textarea 
          id="invoiceDescription" 
          name="invoiceDescription" 
          required></textarea>

          <input type="submit" value="Send!" />
        </form>
      </main>
    </div>
  )
}

