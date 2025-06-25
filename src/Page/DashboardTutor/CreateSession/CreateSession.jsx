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

    const res=await fetch("http://localhost:5000/sessions",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(sessionData)
    })
    const data=await res.json();
    if (data.insertedId) {
        toast.success('Session created successfully!');
        form.reset();
      } else {
        toast.error('Failed to create session');
      }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-xl mx-auto p-4 bg-white rounded shadow"
      >
        <h2 className="text-xl font-semibold mb-4">Create Study Session</h2>

        <div className="flex flex-col">
          <label>Session Title</label>
          <input
            type="text"
            name="sessionTitle"
            placeholder="Session Title"
            required
            className="input"
          />
        </div>

        <div className="flex flex-col">
          <label>Tutor Name</label>
          <input
            type="text"
            name="tutorName"
            defaultValue={user?.displayName}
            readOnly
            className="input bg-gray-100"
          />
        </div>

        <div className="flex flex-col">
          <label>Tutor Email</label>
          <input
            type="email"
            name="tutorEmail"
            defaultValue={user?.email}
            readOnly
            className="input bg-gray-100"
          />
        </div>

        <div className="flex flex-col">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Session Description"
            required
            className="textarea"
          />
        </div>

        <div className="flex flex-col">
          <label>Registration Start Date</label>
          <input
            type="date"
            name="registrationStart"
            required
            className="input"
          />
        </div>

        <div className="flex flex-col">
          <label>Registration End Date</label>
          <input
            type="date"
            name="registrationEnd"
            required
            className="input"
          />
        </div>

        <div className="flex flex-col">
          <label>Class Start Date</label>
          <input
            type="date"
            name="classStart"
            required
            className="input"
          />
        </div>

        <div className="flex flex-col">
          <label>Class End Date</label>
          <input
            type="date"
            name="classEnd"
            required
            className="input"
          />
        </div>

        <div className="flex flex-col">
          <label>Session Duration</label>
          <input
            type="text"
            name="duration"
            placeholder="Session Duration (e.g., 3 hours)"
            required
            className="input"
          />
        </div>

        <div className="flex flex-col">
          <label>Registration Fee</label>
          <input
            type="number"
            name="registrationFee"
            value={0}
            readOnly
            className="input bg-gray-100 cursor-not-allowed"
          />
        </div>

        <input type="hidden" name="status" value="pending" />

        <button type="submit" className="btn btn-primary">
          Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSession;
