import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'; // for alert, install if not added

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
  <title>Annoucement | Smart StudyHub</title>
  <meta name="description" content="Study smarter with our collaborative platform." />
</Helmet>

        <div className="max-w-xl mx-auto space-y-4 bg-white p-6 py-10 rounded-xl shadow-md mt-10">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h1 className="text-2xl font-bold text-center">Add Announcement</h1>

                <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-3 border border-gray-300 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Message"
                    className="w-full p-3 border border-gray-300 rounded"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                >
                    Post Announcement
                </button>
            </form>
        </div>
     </>
    );
};

export default Announcement;
