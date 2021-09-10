import React, { useState } from 'react';
import { GoogleProfile } from './GoogleProfile';
import { Login } from './Login';


export const GoogleUserProfile: React.FC = () => {
    const [googleUser, setGoogleUser] = useState<gapi.auth2.GoogleUser>(undefined);

    console.log("GoogleUserProfile");
    console.log(googleUser);
    return(
            <div>
              <h3>Login using Google</h3>
              <Login setGoogleUser={setGoogleUser}/>
              <GoogleProfile googleUser={googleUser} />
            </div>
      );
    };