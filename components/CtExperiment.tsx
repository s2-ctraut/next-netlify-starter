import { QueryClient, QueryClientProvider, QueryKey, useQuery } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";

// Components
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

// Styles
import { Wrapper } from '../styles/App.styles';
import React, { useEffect } from 'react';

// Types
export type AddResultType = {
  counter: number;
  sum: string;
};

export type AddArgsType = {
  arg1: number;
  arg2: number;
};

const queryClient = new QueryClient();

const CtExperiment = () => {
/*
fetch('https://www.learnwithjason.dev/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
        query GetLearnWithJasonEpisodes($now: DateTime!) {
          allEpisode(limit: 10, sort: {date: ASC}, where: {date: {gte: $now}}) {
            date
            title
            guest {
              name
              twitter
            }
            description
          }
        }
      `,
    variables: {
      now: new Date().toISOString(),
    },
  }),
})
  .then((res) => res.json())
  .then((result) => console.log(result));
*/


  const [arg2, setArg2] = React.useState(0);

  const getSum = async (): Promise<AddResultType> =>
    await (await fetch(`/.netlify/functions/add?arg1=342&arg2=${arg2}`,{ })).json();

  const { data, isLoading, error } = useQuery<AddResultType,AddArgsType>(
    ['arg2', arg2],
    getSum
  );
  console.log(data);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${arg2} times`;
  });

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  const handleCoolStuff = () => {
    console.log('Handling cool stuff...');
    setArg2(arg2+2);
    console.log(`arg2 =  ${arg2}`);
  }

  return (
    <Wrapper>
      <QueryClientProvider client={queryClient}>
      <div>
        <Button onClick={() => handleCoolStuff()}>Do cool stuff</Button>

        <h3>Sum: {data?.sum}</h3>
        <h3>Counter: {data?.counter}</h3>
      </div>
      <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </Wrapper>
  );
};

export default CtExperiment;
