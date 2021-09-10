import React from 'react';

type GoogleUserProfileProps = {
  googleUser: gapi.auth2.GoogleUser
};

export const GoogleProfile: React.FC<GoogleUserProfileProps> = ({ googleUser }) => {
  console.log(googleUser);

  return(
        <div>
          <h3>Google Profile</h3>
          email: {googleUser?.getBasicProfile()?.getEmail()}
          Name:  {googleUser?.getBasicProfile()?.getFamilyName()}
        </div>
  )
};
