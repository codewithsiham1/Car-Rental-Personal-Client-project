import { useContext } from "react";
import { Authcontext } from "../../../Providers/Authprovider/Authprovider";
import { toast } from "react-toastify";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic/UseAxiosPublic";

const CreateNote = () => {
  const { user } = useContext(Authcontext);
  const axiospublic = UseAxiosPublic();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = user?.email;
    const title = form.title.value;
    const description = form.description.value;
    const note = { email, title, description };

    const response = await axiospublic.post("/notes", note);
    if (response.data.insertedId) {
      toast.success("Your note has been saved successfully Created.");
      form.reset(); // Clear the form after success
    } else {
      toast.error("Something went wrong. Try again!");
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-20 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto w-full"
      >
        {/* Email */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={user?.email}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        {/* Title */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold">Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text font-semibold">Description</span>
          </label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Write your note..."
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="form-control">
          <button type="submit" className="btn btn-primary w-full">
            Create Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
