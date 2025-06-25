import { useContext } from "react";
import { Authcontext } from "../../../Providers/Authprovider/Authprovider";

import { toast } from "react-toastify";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic/UseAxiosPublic";


const CreateNote = () => {
    const {user}=useContext(Authcontext)
    const axiospublic=UseAxiosPublic()
    const handleSubmit=async(event)=>{
        event.preventDefault()
       const form=event.target;
       const email=user?.email;
       const title=form.title.value;
       const description=form.description.value;
       const note={email,title,description}
       const response=await axiospublic.post('/notes',note);
       if(response.data.insertedId){
        toast.success('Your note has been saved successfully Created.')
       }else{
        toast.error('Something went wrong. Try again!')
       }
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