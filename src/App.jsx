import { useState } from 'react'
import './App.css'
import { send } from 'emailjs-com'


export default function App() {
  const [count, setCount] = useState(0)

  const [toSend, setToSend] = useState({
    recipientEmail: '',
    senderContact: '',
    unitsInvoiced: '',
    invoiceDescription: '',
  });

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  function onSubmit(e) {
    e.preventDefault();
    send(Bitvoice, template_efo3bp2, toSend, wFHLTcghtNMJbuPQZ)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
  }

  const showAlert = () => {
    alert(
      `Recipient Email Address: ${toSend.recipientEmail}\n` +
      `Sender Contact Information: ${toSend.senderContact}\n` +
      `Units Invoiced: ${toSend.unitsInvoiced}\n` +
      `Invoice Description: ${toSend.invoiceDescription}`
    );
  }

  return (
    <div className="App">
      <main>
        <h1>Email Form</h1>
        <form action="#" method="POST">
          <label htmlFor="recipientEmail">Recipient Email Address:</label>
          <input type="email" 
          id="recipientEmail" 
          name="recipientEmail"

          value={toSend.recipientEmail}
          onChange={handleChange}

          required />

          <label htmlFor="senderContact">Sender Contact Information:</label>
          <input type="text" 
          id="senderContact" 
          name="senderContact" 
          
          value={toSend.senderContact}
          onChange={handleChange}
          
          required />

          <label htmlFor="unitsInvoiced">Units Invoiced:</label>
          <input type="number" 
          id="unitsInvoiced" 
          name="unitsInvoiced" 
          
          value={toSend.unitsInvoiced}
          onChange={handleChange}

          required />

          <label htmlFor="invoiceDescription">Invoice Description:</label>
          <textarea id="invoiceDescription" 
          name="invoiceDescription" 
          
          value={toSend.invoiceDescription}
          onChange={handleChange}
          
          required></textarea>

          <input type="submit" value="Send!" />
          <button type="button" onClick={showAlert}>Display Form Values</button>
        </form>
      </main>
    </div>
  )
}

