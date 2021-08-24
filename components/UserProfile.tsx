// TODO: https://thecodest.co/blog/deploy-graphql-mongodb-api-using-netlify-functions/

import React, { ChangeEvent, useState } from 'react';
import { ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery } from '@apollo/client';

const apolloClient = new ApolloClient({
  name: "UserProfile",
  uri: "/api/persistance",
  cache: new InMemoryCache()
});

type UserProfileProps = {
};

interface LoginResultType {
  login: {
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

const UserProfile: React.FC<UserProfileProps> = ({ /* item, handleAddToCart */ }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const functionResult = useQuery<LoginResultType,LoginArgs>(
    LOGIN, 
    { variables: {
        email: formData.email, password: formData.password
        },
      client: apolloClient 
    },
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData( {...formData, [event.target.name]: event.target.value});
    console.log('Login');
    console.log(functionResult);
  }

  return(
    <ApolloProvider client={apolloClient}>
        <div>
          <h3>Login using GraphQL</h3>
          email: <input name="email" onChange={handleChange} />
          password: 
          <input name="password" onChange={handleChange} />
          <br/>token: {functionResult.data?.login?.token || functionResult?.error?.message}
        </div>
    </ApolloProvider>
  )
};

export default UserProfile;
