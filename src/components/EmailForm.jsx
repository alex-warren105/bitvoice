import { useState, useRef } from 'react';
import emailjs from 'emailjs-com';

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
        e.preventDefault();// prevents form from default refreshing the page

        // Set the timestamp to the current time
        const now = new Date();
        setTimestamp(now.toLocaleString());

        // Update the hidden input field with the timestamp
        const timestampField = form.current.elements.namedItem("timestamp");
        timestampField.value = now.toLocaleString();

        emailjs
        .sendForm(
            'default_service',
            'template_efo3bp2',
            form.current,
            'wFHLTcghtNMJbuPQZ'
        )
        .then(
            (result) => {
            console.log(result.text);
            setEmailSent(true);
            },
            (error) => {
            console.log(error.text);
            }
        );
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
