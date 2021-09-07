import React from 'react';
import { gql, useQuery } from '@apollo/client';

type UserProfileProps = {
  token: string | undefined
};

interface UserArgs {
    token: string;
};
interface UserProfileType {
  me: {
    id: string;
    email: string;
    name: string;
  }
};

const GET_MY_PROFILE = gql`
  query getMyProfile { 
    me {
      id
      email
      name
    }
  }
`
;

export const UserData: React.FC<UserProfileProps> = ({ token }) => {

  const myUserProfile = useQuery<UserProfileType,UserArgs>(
    GET_MY_PROFILE, 
    { 
      variables: {token},
      errorPolicy: "all",
      onError: (error) => {
        console.log("Error getting profile");
        console.log(error.message);
        console.log(token);
        console.log(myUserProfile.data);
      },
      onCompleted: (data) => {
        console.log("Got profile");
        console.log(data);
      },
      fetchPolicy: "no-cache",
    },
  );

  return(
        <div>
          <h3>User Data from MongoDB</h3>
          <br/>token: { token }
          <br/>id: {myUserProfile.data?.me?.id || myUserProfile?.error?.message}
          <br/>Name: {myUserProfile.data?.me?.name || myUserProfile?.error?.message}
        </div>
  )
};
