import React from 'react';

type GoogleUserProfileProps = {
  profile: gapi.auth2.BasicProfile;
};

export const GoogleProfile: React.FC<GoogleUserProfileProps> = ({ profile }) => {
  console.log("GoogleProfile");
  console.log(profile.getEmail());

  return(
        <div>
          <h3>Google Profile</h3>
          name: {profile.getName()}<br/>
          email: {profile.getEmail()}
        </div>
  )
};
