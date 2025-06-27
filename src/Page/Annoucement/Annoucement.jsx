import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const Announcement = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !message) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops!',
                text: 'Please fill in both fields!',
            });
            return;
        }

        // TODO: Send to server here
        console.log({ title, message });

        Swal.fire({
            icon: 'success',
            title: 'Announcement Posted!',
        });

        setTitle('');
        setMessage('');
    };

    return (
     <>
       <Helmet>
         <title>Announcement | Smart StudyHub</title>
         <meta name="description" content="Study smarter with our collaborative platform." />
       </Helmet>

       <div className="max-w-xl mx-auto mt-10 p-6 sm:p-10 bg-white rounded-xl shadow-md space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-2xl font-bold text-center">Add Announcement</h1>

            <input
                type="text"
                placeholder="Title"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Message"
                className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
            >
                Post Announcement
            </button>
          </form>
       </div>
     </>
    );
};

export default Announcement;
