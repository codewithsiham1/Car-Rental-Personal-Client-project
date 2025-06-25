import { useQuery, useQueryClient } from '@tanstack/react-query';
import Useauth from '../../../Hooks/Useauth/Useauth';
import UseAxiosSecure from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import { useState } from 'react';
import { toast } from 'react-toastify';

const TutorMaterials = () => {
     const { user } = Useauth();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const [editingMaterial, setEditingMaterial] = useState(null);

  // ✅ Fetch materials for logged-in tutor
  const { data: materials = [], isLoading } = useQuery({
    queryKey: ['tutorMaterials', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/materials?tutorEmail=${user?.email}`);
      return res.data;
    }
  });

  // ✅ Delete material
  const deleteMaterial = async (id) => {
    const confirm = window.confirm('Are you sure to delete this material?');
    if (!confirm) return;
    const res = await axiosSecure.delete(`/materials/${id}`);
    if (res.data.deletedCount) {
      toast.success('Material deleted');
      queryClient.invalidateQueries(['tutorMaterials']);
    }
  };

  // ✅ Update material (image + title + link)
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const resourceLink = form.resourceLink.value;
    const imageFile = form.image.files[0];

    let imageUrl = editingMaterial.image;

    // Optional: Upload new image
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=YOUR_IMGBB_KEY`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      imageUrl = data.data.display_url;
    }

    const updatedMaterial = {
      title,
      resourceLink,
      image: imageUrl
    };

    const res = await axiosSecure.put(`/materials/${editingMaterial._id}`, updatedMaterial);
    if (res.data.modifiedCount) {
      toast.success('Material updated');
      queryClient.invalidateQueries(['tutorMaterials']);
      setEditingMaterial(null);
    }
  };
    return (
            <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Uploaded Materials</h2>

      {materials.map((mat) => (
        <div key={mat._id} className="border p-4 mb-4 rounded shadow">
          <h3 className="text-lg font-semibold">{mat.title}</h3>
          <img src={mat.image} alt="Material" className="w-32 h-32 object-cover mt-2 rounded" />
          <p className="text-sm mt-1">Session ID: {mat.sessionId}</p>
          <a href={mat.resourceLink} target="_blank" rel="noreferrer" className="text-blue-500 underline">
            Google Drive Link
          </a>
          <div className="mt-2 flex gap-2">
            <button onClick={() => setEditingMaterial(mat)} className="btn btn-sm bg-yellow-500 text-white">
              Update
            </button>
            <button onClick={() => deleteMaterial(mat._id)} className="btn btn-sm bg-red-600 text-white">
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* ✅ Update Form Modal */}
      {editingMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow w-[90%] md:w-[400px]">
            <h2 className="text-xl font-bold mb-4">Update Material</h2>
            <input
              type="text"
              name="title"
              defaultValue={editingMaterial.title}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              name="resourceLink"
              defaultValue={editingMaterial.resourceLink}
              className="input input-bordered w-full mb-2"
            />
            <input type="file" name="image" accept="image/*" className="file-input file-input-bordered w-full mb-2" />

            <div className="flex justify-end gap-2 mt-2">
              <button type="submit" className="btn btn-success">Update</button>
              <button onClick={() => setEditingMaterial(null)} className="btn btn-ghost">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
    );
};

export default TutorMaterials;