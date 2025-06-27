import React from 'react';
import Useauth from '../../../Hooks/Useauth/Useauth';
import { toast } from 'react-toastify';

const CreateSession = () => {
  const { user } = Useauth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const sessionTitle = form.sessionTitle.value;
    const tutorName = form.tutorName.value;
    const tutorEmail = form.tutorEmail.value;
    const description = form.description.value;
    const registrationStart = form.registrationStart.value;
    const registrationEnd = form.registrationEnd.value;
    const classStart = form.classStart.value;
    const classEnd = form.classEnd.value;
    const duration = form.duration.value;
    const registrationFee = form.registrationFee.value;
    const status = form.status.value;

    const sessionData = {
      sessionTitle,
      tutorName,
      tutorEmail,
      description,
      registrationStart,
      registrationEnd,
      classStart,
      classEnd,
      duration,
      registrationFee,
      status,
    };

    console.log(sessionData);

    const res = await fetch("http://localhost:5000/sessions", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sessionData)
    });
    const data = await res.json();
    if (data.insertedId) {
      toast.success('Session created successfully!');
      form.reset();
    } else {
      toast.error('Failed to create session');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full max-w-xl bg-white rounded-lg shadow-lg p-6 sm:p-8"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Create Study Session</h2>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Session Title</label>
          <input
            type="text"
            name="sessionTitle"
            placeholder="Session Title"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Tutor Name</label>
          <input
            type="text"
            name="tutorName"
            defaultValue={user?.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Tutor Email</label>
          <input
            type="email"
            name="tutorEmail"
            defaultValue={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Session Description"
            required
            className="textarea textarea-bordered w-full resize-none"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Registration Start Date</label>
            <input
              type="date"
              name="registrationStart"
              required
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Registration End Date</label>
            <input
              type="date"
              name="registrationEnd"
              required
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Class Start Date</label>
            <input
              type="date"
              name="classStart"
              required
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Class End Date</label>
            <input
              type="date"
              name="classEnd"
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Session Duration</label>
          <input
            type="text"
            name="duration"
            placeholder="Session Duration (e.g., 3 hours)"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Registration Fee</label>
          <input
            type="number"
            name="registrationFee"
            value={0}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <input type="hidden" name="status" value="pending" />

        <button
          type="submit"
          className="btn btn-primary w-full py-3 text-lg font-semibold"
        >
          Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSession;
