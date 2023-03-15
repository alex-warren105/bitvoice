import { useState, useRef } from 'react';
import emailjs from 'emailjs-com';

export default function EmailForm() {
    const [timestamp, setTimestamp] = useState('')
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        console.log('Sending email...');
        const now = new Date();
        setTimestamp(now.toLocaleString());
        console.log('Timestamp set to:', timestamp);

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
            },
            (error) => {
            console.log(error.text);
            }
        );
    };

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

        <input type="submit" value="Send!" />

        <input 
            type='hidden' 
            id="timestamp" 
            name='timestamp' 
            value={timestamp}
            />
        </form>
    );
}
