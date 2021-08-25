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
  // uri: "/api/persistance",
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

const LOGIN = gql`
  query login($email: String!, $password: String!) { 
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

const USER_PROFILE = gql`
  query user($i: String) { 
    me(i: $i) {
      id
      email
      name
    }
  }
`
;

const UserProfile: React.FC<UserProfileProps> = ({ /* item, handleAddToCart */ }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const loginResult = useQuery<LoginResultType,LoginArgs>(
    LOGIN, 
    { variables: {
        email: formData.email, password: formData.password
        },
      client: apolloClient 
    },
  );

  const userProfile = useQuery<UserProfileType,UserArgs>(
    USER_PROFILE, 
    { 
      variables: {
          token
        },
      client: apolloClient 
    },
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData( {...formData, [event.target.name]: event.target.value});
  }

  return(
    <ApolloProvider client={apolloClient}>
        <div>
          <h3>Login using GraphQL</h3>
          email: <input name="email" onChange={handleChange} />
          password: 
          <input name="password" onChange={handleChange} />
          <br/>token: { (loginResult.data?.login?.token === undefined) || (token = loginResult.data?.login?.token) }
          <br/>id: {userProfile.data?.me?.id || userProfile?.error?.message}
          <br/>Name: {userProfile.data?.me?.name || userProfile?.error?.message}
        </div>
    </ApolloProvider>
  )
};

export default UserProfile;
