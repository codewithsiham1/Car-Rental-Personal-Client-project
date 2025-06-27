import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UseAxiosSecure from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import { toast } from 'react-toastify';

const UpdateNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/notes/${id}`)
      .then((res) => setNote(res.data))
      .catch(() => setNote({}));
  }, [id, axiosSecure]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;

    const res = await axiosSecure.put(`/notes/${id}`, { title, description });
    if (res.data.modifiedCount > 0) {
      toast.success("Note updated successfully!");
    } else {
      toast.error("Failed to update note.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <form 
        onSubmit={handleUpdate} 
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8"
      >
        {/* Title */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold text-gray-700">Title</span>
          </label>
          <input
            type="text"
            name="title"
            defaultValue={note.title || ''}
            placeholder="Enter title"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text font-semibold text-gray-700">Description</span>
          </label>
          <textarea
            name="description"
            defaultValue={note.description || ''}
            className="textarea textarea-bordered w-full resize-none"
            rows={5}
            placeholder="Write your note..."
            required
          />
        </div>

        {/* Submit button */}
        <div className="form-control">
          <button 
            type="submit" 
            className="btn btn-primary w-full py-3 text-lg font-semibold"
          >
            Update Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateNote;
