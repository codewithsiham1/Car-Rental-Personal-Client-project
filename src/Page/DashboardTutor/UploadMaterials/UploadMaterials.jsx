import React, { useState } from 'react';
import Useauth from '../../../Hooks/Useauth/Useauth';
import { useQuery } from '@tanstack/react-query';
import { axiosSecure } from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import { toast } from 'react-toastify';

const UploadMaterials = () => {
    const {user}=Useauth()
     const [selectedSession, setSelectedSession] = useState('');
  const [imagePreview, setImagePreview] = useState('');
    // get approved session for the tutor
    const {data:approvedSessions=[]}=useQuery({
        queryKey:['approvedSessions',user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/sessions?tutorEmail=${user.email}`);
            return res.data.filter((session)=>session.status==='approved')
        }
    })
    // handle metarial upload


  // ✅ Step 2: Handle material upload

  // ✅ Step 2: Handle material upload
  const handleUpload = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const sessionId = form.sessionId.value;
    const resourceLink = form.resourceLink.value;
    const imageFile = form.image.files[0];

    // ✅ Upload image to ImgBB
    const formData = new FormData();
    formData.append('image', imageFile);
const imageHostingKey = import.meta.env.VITE_IMAGE_KEY;
    const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${imageHostingKey}`, {
      method: 'POST',
      body: formData
    });

    const imgbbData = await imgbbRes.json();
    const imageUrl = imgbbData.data.display_url;

    const materialData = {
      title,
      sessionId,
      tutorEmail: user.email,
      resourceLink,
      image: imageUrl,
      uploadDate: new Date()
    };

    // ✅ Save material to database
    const res = await axiosSecure.post('/materials', materialData);
    if (res.data.insertedId) {
      toast.success("Material uploaded successfully");
      form.reset();
      setSelectedSession(null);
    }
  };
    return (
      <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Materials for Approved Sessions</h2>

      {/* ✅ List approved sessions */}
      {approvedSessions.map(session => (
        <div key={session._id} className="border p-4 rounded-md mb-4 shadow-md">
          <h3 className="text-lg font-semibold">{session.title}</h3>
          <p>{session.description}</p>
          <button
            onClick={() => setSelectedSession(session)}
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Upload Material
          </button>
        </div>
      ))}

      {/* ✅ Upload form */}
      {selectedSession && (
        <form onSubmit={handleUpload} className="mt-6 border p-4 rounded shadow bg-white">
          <h3 className="font-semibold mb-2">Upload Material for: {selectedSession.title}</h3>

          <input type="text" name="title" placeholder="Material Title" className="input input-bordered w-full mb-2" required />
          <input type="text" name="sessionId" value={selectedSession._id} readOnly className="input input-bordered w-full mb-2" />
          <input type="text" name="tutorEmail" value={user.email} readOnly className="input input-bordered w-full mb-2" />
          <input type="file" name="image" accept="image/*" className="file-input file-input-bordered w-full mb-2" required />
          <input type="text" name="resourceLink" placeholder="Google Drive Resource Link" className="input input-bordered w-full mb-2" required />

          <button className="btn btn-primary mt-2">Upload Material</button>
        </form>
      )}
    </div>
    );
};

export default UploadMaterials;