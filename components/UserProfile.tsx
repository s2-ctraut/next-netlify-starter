import React, { ChangeEvent, useState } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, gql, InMemoryCache, useQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { UserData } from './UserData';

const httpLink = createHttpLink({
  uri: "/api/persistance",
});

let token: string;
const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return token? {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    } 
  } : headers;
});

const profileApolloClient = new ApolloClient({
  name: "UserProfile",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

interface LoginArgs {
    email: string;
    password: string;
};

interface LoginResultType {
  login: {
    id: string;
    token: string;
  }
};

const GET_TOKEN = gql`
  query getToken($email: String!, $password: String!) { 
    login(email: $email, password: $password) {
      token
    }
  }
`
;

export const UserProfile: React.FC = () => {
  const [formData, setFormData] = useState({ email: 'john2@example.com', password: '' });
  const [jwt, setJwt] = useState<string | undefined>(undefined);

  const loginResult = useQuery<LoginResultType,LoginArgs>(
    GET_TOKEN, 
    { variables: {
        email: formData.email, password: formData.password
        },
      client: profileApolloClient,
      fetchPolicy: "no-cache",
      errorPolicy: "all",
      onError: (error) => {
        console.log("Error logging in");
        console.log(error.message);
        token = undefined;
        setJwt(token);
      },
      onCompleted: (data) => {
        console.log("Setting token");
        token = data.login.token;
        setJwt(token);
      }
    },
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("Login data changed");
    setFormData( {...formData, [event.target.name]: event.target.value});
    token = undefined;
    setJwt(token);
    loginResult.refetch();
  }

  return(
    <ApolloProvider client={profileApolloClient}>
        <div>
          <h3>Login using GraphQL</h3>
          email: <input name="email" onChange={handleChange} />
          password: 
          <input name="password" onChange={handleChange} />
          <br/>token: { loginResult.data?.login?.token }
          <UserData token={ jwt } />
        </div>
    </ApolloProvider>
  )
};
