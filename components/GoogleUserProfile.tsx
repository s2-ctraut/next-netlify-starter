import React, { useState } from 'react';
import { GoogleProfile } from './GoogleProfile';
import { Login } from './login';


export const GoogleUserProfile: React.FC = () => {
    const [googleUser, setGoogleUser] = useState<gapi.auth2.GoogleUser>(undefined);

    return(
            <div>
              <h3>Login using Google</h3>
              <Login setGoogleUser={setGoogleUser}/>
              <GoogleProfile googleUser={googleUser} />
            </div>
      );
    };