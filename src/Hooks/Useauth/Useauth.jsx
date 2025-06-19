import React, { useContext } from 'react';
import { Authcontext } from '../../Providers/Authprovider/Authprovider';

const Useauth = () => {
 const auth=useContext(Authcontext)
 return auth
};

export default Useauth;