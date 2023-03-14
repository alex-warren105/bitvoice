import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <main>
        <h1>Email Form</h1>
        <form action="#" method="POST">
          <label for="recipient-email">Recipient Email Address:</label>
          <input type="email" id="recipient-email" name="recipient-email" required />

          <label for="sender-contact">Sender Contact Information:</label>
          <input type="text" id="sender-contact" name="sender-contact" required />

          <label for="units-invoiced">Units Invoiced:</label>
          <input type="number" id="units-invoiced" name="units-invoiced" required />

          <label for="invoice-description">Invoice Description:</label>
          <textarea id="invoice-description" name="invoice-description" required></textarea>

          <input type="submit" value="Send!" />
        </form>
      </main>
    </div>
  )
}

export default App
