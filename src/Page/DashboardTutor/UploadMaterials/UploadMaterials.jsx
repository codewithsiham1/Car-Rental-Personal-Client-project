import React from 'react';

const UploadMaterials = () => {
    return (
        <div>
            <form onSubmit={handleUpload} className="mt-6 border p-4 rounded shadow bg-white">
          <h3 className="font-semibold mb-2">Upload Material for: {selectedSession.title}</h3>

          <input type="text" name="title" placeholder="Material Title" className="input input-bordered w-full mb-2" required />
          <input type="text" name="sessionId" value={selectedSession._id} readOnly className="input input-bordered w-full mb-2" />
          <input type="text" name="tutorEmail" value={user.email} readOnly className="input input-bordered w-full mb-2" />
          <input type="file" name="image" accept="image/*" className="file-input file-input-bordered w-full mb-2" required />
          <input type="text" name="resourceLink" placeholder="Google Drive Resource Link" className="input input-bordered w-full mb-2" required />

          <button className="btn btn-primary mt-2">Upload Material</button>
        </form>
        </div>
    );
};

export default UploadMaterials;