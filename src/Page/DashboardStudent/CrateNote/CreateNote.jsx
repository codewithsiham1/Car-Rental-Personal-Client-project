import { useContext } from "react";
import { Authcontext } from "../../../Providers/Authprovider/Authprovider";


const CreateNote = () => {
    const {user}=useContext(Authcontext)
    const handleSubmit=(event)=>{
        event.preventDefault()
       const form=event.target;
       const email=user?.email;
       const title=form.title.value;
       const description=form.description.value;
       console.log(email,title,description)
    }
    return (
        <div >
            <form onSubmit={handleSubmit} className="card-body w-full max-w-md mx-auto">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" value={user?.email} className="input input-bordered" readOnly />
        </div>
        {/* title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input type="text" name="title" placeholder="Enter title" className="input input-bordered" required />
        </div>
        {/* description */}
            <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea name="description"
          className="textarea textarea-bordered"
          placeholder="Write your note..."
       
        />
      </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
          Create Note
        </button>
        </div>
      </form>
        </div>
    );
};

export default CreateNote;