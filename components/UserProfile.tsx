// TODO: https://thecodest.co/blog/deploy-graphql-mongodb-api-using-netlify-functions/

import React, { ChangeEvent, useState } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, gql, InMemoryCache, useQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: "/api/persistance",
});

let token;
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return token? {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    } 
  } : headers;
});

const apolloClient = new ApolloClient({
  name: "UserProfile",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

type UserProfileProps = {
};

interface LoginResultType {
  login: {
    id: string;
    token: string;
  }
};

interface LoginArgs {
    email: string;
    password: string;
};

const GET_TOKEN = gql`
  query getToken($email: String!, $password: String!) { 
    login(email: $email, password: $password) {
      token
    }
  }
`
;

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

const UserProfile: React.FC<UserProfileProps> = ({ /* item, handleAddToCart */ }) => {
  const [formData, setFormData] = useState({ email: 'john2@example.com', password: '' });
  const [myJwt, setMyJwt] = useState({token: undefined});

  const loginResult = useQuery<LoginResultType,LoginArgs>(
    GET_TOKEN, 
    { variables: {
        email: formData.email, password: formData.password
        },
      client: apolloClient,
      errorPolicy: "all",
      onError: (error) => {
        console.log("Error logging in");
        console.log(error.message);
        myUserProfile.refetch();
      },
      onCompleted: (data) => {
        console.log("Setting token");
        token = data.login.token;
        setMyJwt( { token: data.login.token });
        myUserProfile.refetch();
      }
    },
  );

  const myUserProfile = useQuery<UserProfileType,UserArgs>(
    GET_MY_PROFILE, 
    { 
      // variables: {token: myJwt.token},
      // pollInterval: 500,
      errorPolicy: "all",
      onError: (error) => {
        console.log("Error getting profile");
        console.log(error.message);
        console.log(myUserProfile.data);
      },
      onCompleted: (data) => {
        console.log("Got profile");
        console.log(data);
      },
      client: apolloClient,
      fetchPolicy: "no-cache",
    },
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("Unsetting token");
    token = undefined;
    setMyJwt({token: undefined});
    setFormData( {...formData, [event.target.name]: event.target.value});
    loginResult.refetch();
  }

  return(
    <ApolloProvider client={apolloClient}>
        <div>
          <h3>Login using GraphQL</h3>
          email: <input name="email" onChange={handleChange} />
          password: 
          <input name="password" onChange={handleChange} />
          <br/>token: { loginResult.data?.login?.token }
          <br/>id: {myUserProfile.data?.me?.id || myUserProfile?.error?.message}
          <br/>Name: {myUserProfile.data?.me?.name || myUserProfile?.error?.message}
        </div>
    </ApolloProvider>
  )
};

export default UserProfile;
