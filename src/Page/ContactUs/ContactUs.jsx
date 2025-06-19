import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, message } = formData;

        if (!name || !email || !message) {
            Swal.fire({
                icon: 'warning',
                title: 'All fields are required!'
            });
            return;
        }

        // Here you can send the message to the backend or email API
        console.log(formData);

        Swal.fire({
            icon: 'success',
            title: 'Message Sent Successfully!'
        });

        setFormData({ name: '', email: '', message: '' });
    };

    return (
      <>
      <Helmet>
  <title>contactus | Smart StudyHub</title>
  <meta name="description" content="Study smarter with our collaborative platform." />
</Helmet>

        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Send Message
                </button>
            </form>
        </div>
      </>
    );
};

export default ContactUs;
