import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UseAxiosSecure from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import { toast } from 'react-toastify';

const UpdateNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState('');
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/notes/${id}`)
      .then((res) => setNote(res.data));
  }, [id, axiosSecure]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;

    const res = await axiosSecure.put(`/notes/${id}`, { title, description });
    if (res.data.modifiedCount > 0) {
      toast.success("Note updated successfully!");
    }
  };

  

  return (
    <div className='max-w-md mx-auto p-4'>
      <form onSubmit={handleUpdate} className="card-body w-full max-w-md mx-auto">

        {/* title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            name="title"
            defaultValue={note.title}
            placeholder="Enter title"
            className="input input-bordered"
            required
          />
        </div>

        {/* description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            defaultValue={note.description}
            className="textarea textarea-bordered"
            placeholder="Write your note..."
            required
          />
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Update Note
          </button>
        </div>

      </form>
    </div>
  );
};

export default UpdateNote;
