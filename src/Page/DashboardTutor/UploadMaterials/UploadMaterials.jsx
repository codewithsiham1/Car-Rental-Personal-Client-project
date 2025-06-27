import React, { useState } from 'react';
import Useauth from '../../../Hooks/Useauth/Useauth';
import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import { toast } from 'react-toastify';

const UploadMaterials = () => {
  const { user } = Useauth();
  const [selectedSession, setSelectedSession] = useState(null);

  // get approved session for the tutor
  const { data: approvedSessions = [] } = useQuery({
    queryKey: ['approvedSessions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions?tutorEmail=${user.email}`);
      return res.data.filter((session) => session.status === 'approved');
    },
  });

  const handleUpload = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const sessionId = form.sessionId.value;
    const resourceLink = form.resourceLink.value;
    const imageFile = form.image.files[0];

    // Upload image to ImgBB
    const formData = new FormData();
    formData.append('image', imageFile);
    const imageHostingKey = import.meta.env.VITE_IMAGE_KEY;
    const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${imageHostingKey}`, {
      method: 'POST',
      body: formData,
    });
    const imgbbData = await imgbbRes.json();
    const imageUrl = imgbbData.data.display_url;

    const materialData = {
      title,
      sessionId,
      tutorEmail: user.email,
      resourceLink,
      image: imageUrl,
      uploadDate: new Date(),
    };

    // Save material to database
    const res = await axiosSecure.post('/materials', materialData);
    if (res.data.insertedId) {
      toast.success('Material uploaded successfully');
      form.reset();
      setSelectedSession(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Materials for Approved Sessions</h2>

      {/* List approved sessions */}
      <div className="space-y-6">
        {approvedSessions.map((session) => (
          <div
            key={session._id}
            className="border rounded-md p-4 shadow-md bg-white"
          >
            <h3 className="text-lg font-semibold mb-1">{session.title}</h3>
            <p className="text-gray-700 mb-3">{session.description}</p>
            <button
              onClick={() => setSelectedSession(session)}
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Upload Material
            </button>
          </div>
        ))}
      </div>

      {/* Upload form */}
      {selectedSession && (
        <form
          onSubmit={handleUpload}
          className="mt-8 bg-white p-6 rounded shadow-md space-y-4"
        >
          <h3 className="font-semibold text-xl mb-4">
            Upload Material for: {selectedSession.title}
          </h3>

          <input
            type="text"
            name="title"
            placeholder="Material Title"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="sessionId"
            value={selectedSession._id}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
          <input
            type="text"
            name="tutorEmail"
            value={user.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            required
          />
          <input
            type="text"
            name="resourceLink"
            placeholder="Google Drive Resource Link"
            className="input input-bordered w-full"
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-full py-3 text-lg font-semibold"
          >
            Upload Material
          </button>
        </form>
      )}
    </div>
  );
};

export default UploadMaterials;
