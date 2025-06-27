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

  // Fetch materials for logged-in tutor
  const { data: materials = [], isLoading } = useQuery({
    queryKey: ['tutorMaterials', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/materials?tutorEmail=${user?.email}`);
      return res.data;
    }
  });

  // Delete material
  const deleteMaterial = async (id) => {
    const confirm = window.confirm('Are you sure to delete this material?');
    if (!confirm) return;
    const res = await axiosSecure.delete(`/materials/${id}`);
    if (res.data.deletedCount) {
      toast.success('Material deleted');
      queryClient.invalidateQueries(['tutorMaterials']);
    }
  };

  // Update material (image + title + link)
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

  if (isLoading) return <p className="text-center py-10 text-lg">Loading materials...</p>;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Uploaded Materials</h2>

      <div className="space-y-6">
        {materials.map((mat) => (
          <div
            key={mat._id}
            className="border rounded-md p-4 shadow-md bg-white flex flex-col md:flex-row md:items-center gap-4"
          >
            <img
              src={mat.image}
              alt="Material"
              className="w-full max-w-xs h-32 object-cover rounded-md mx-auto md:mx-0"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{mat.title}</h3>
              <p className="text-sm mt-1">Session ID: {mat.sessionId}</p>
              <a
                href={mat.resourceLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Google Drive Link
              </a>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button
                onClick={() => setEditingMaterial(mat)}
                className="btn btn-sm bg-yellow-500 text-white hover:bg-yellow-600 transition px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => deleteMaterial(mat._id)}
                className="btn btn-sm bg-red-600 text-white hover:bg-red-700 transition px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Form Modal */}
      {editingMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded shadow-md w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4 text-center">Update Material</h2>
            <input
              type="text"
              name="title"
              defaultValue={editingMaterial.title}
              className="input input-bordered w-full mb-3"
              required
            />
            <input
              type="text"
              name="resourceLink"
              defaultValue={editingMaterial.resourceLink}
              className="input input-bordered w-full mb-3"
              required
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input file-input-bordered w-full mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                type="submit"
                className="btn btn-success px-5 py-2 rounded"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditingMaterial(null)}
                className="btn btn-ghost px-5 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TutorMaterials;
