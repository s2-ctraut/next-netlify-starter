import React from 'react';

export type RemoteProfileProps = {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
};

export const RemoteProfile: React.FC<RemoteProfileProps> = ({ name, email }) => {
  return(
        <div>
          <h3>Remote Profile</h3>
          email: {email}<br/>
          name: {name}
        </div>
  )
};
