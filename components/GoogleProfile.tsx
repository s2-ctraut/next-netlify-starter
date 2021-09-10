import React from 'react';

type GoogleUserProfileProps = {
  email: string;
};

export const GoogleProfile: React.FC<GoogleUserProfileProps> = ({ email }) => {
  console.log("GoogleProfile");
  console.log(email);

  return(
        <div>
          <h3>Google Profile</h3>
          email: {email}
        </div>
  )
};
