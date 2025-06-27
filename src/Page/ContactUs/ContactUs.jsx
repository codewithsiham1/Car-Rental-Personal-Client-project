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
                <title>Contact Us | Smart StudyHub</title>
                <meta name="description" content="Study smarter with our collaborative platform." />
            </Helmet>

            <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
                <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 md:p-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-6">
                        Contact Us
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                                Message
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                rows="5"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactUs;
