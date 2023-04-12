import { useState, useRef } from 'react';

/**
 * A form component that allows users to send an invoice email.
 */

export default function EmailForm() {
    // Initialize state variables to hold the timestamp and whether the email has been sent
    const [timestamp, setTimestamp] = useState('')
    const [emailSent, setEmailSent] = useState(false);
    const form = useRef();
    /**
     * Sends an email using the emailjs API and sets the timestamp state.
     * 
     * @param {Object} e - The event object
     */
    const sendEmail = (e) => {
        e.preventDefault();
      
        // Get the current timestamp in the user's local timezone
        const now = new Date();
        const timestamp = now.toLocaleString(undefined, { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
      
        const formData = new FormData(form.current);
        formData.append('timestamp', timestamp);
      
        fetch('/.netlify/functions/sendForm', {
          method: 'POST',
          body: JSON.stringify(Object.fromEntries(formData)),
        })
          .then((res) => res.json())
          .then((data) => {
            setEmailSent(true);
            setTimestamp(timestamp); // set the timestamp state to the user's local timezone
          })
          .catch((error) => {
            console.error(error);
          });
      };
      

    /**
     * Sets the emailSent state to false, which dismisses the success alert.
     */

    const handleAlertDismiss = () => {
        setEmailSent(false);
        window.location.reload();
    }

    return (
        <form ref={form} onSubmit={sendEmail}>
        <label htmlFor="recipientEmail">Recipient Email Address:</label>
        <input type="email" id="recipientEmail" name="recipientEmail" required />

        <label htmlFor="senderContact">Sender Contact Information:</label>
        <input type="text" id="senderContact" name="senderContact" required />

        <label htmlFor="unitType">Currency</label>
        <select name="unitType">
            <option>USD $</option>
        </select>

        <label htmlFor="unitsInvoiced">Units Invoiced:</label>
        <input type="number" id="unitsInvoiced" name="unitsInvoiced" required />

        <label htmlFor="invoiceDescription">Invoice Description:</label>
        <textarea id="invoiceDescription" name="invoiceDescription" required></textarea>

        <input type="submit" value="Send!" disabled={emailSent} />
        {/* Success message displayed when email is sent */}
        {emailSent && (
            <div className="alert alert-success" role="alert">
                Invoice sent successfully!
                <button type="button" className="btn-close" onClick={handleAlertDismiss}>Send Another Bitvoice!</button>
            </div>
        )}
        {/* Hidden input field to hold the timestamp */}
        <input type='hidden' id="timestamp" name='timestamp' value={timestamp}/>
        </form>
    );
}
