import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import React, { useEffect } from 'react';
import AddInBrowser from './Adder/AddInBrowser';
import AddInFunction from './Adder/AddInFunction';
import AddUsingGraphQL from './Adder/AddUsingGraphQL';

// Components
// import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

// Styles
import { Wrapper } from '../styles/App.styles';

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

  const [arg2, setArg2] = React.useState(0);

  const getSum = async (): Promise<AddResultType> =>
    await (await fetch(`/.netlify/functions/add?arg1=342&arg2=${arg2}`,{ })).json();

  const { data, error } = useQuery<AddResultType,AddArgsType>(
    ['adding', arg2],
    getSum
  );

  const getEpisodes = async (): Promise<any> =>
    await ( await 
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
    .then((res) => res.json()));
//  .then((result) => console.log(result)));

  const { data: episodeData} = useQuery<any,AddArgsType>(
    'episodes',
    getEpisodes
  );

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${arg2} times`;
  });

  // if (isLoading) return <LinearProgress />;
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

        <h3>Cloud Function Call Result: Sum {data?.sum}</h3>
        <h3>Cloud Function Call Result: Sum {data?.sum}</h3>
        <h3>Cloud Function Instance Variable: CallCounter: {data?.counter}</h3>
        <h3>External Graphql Result: episode: {episodeData?.data.allEpisode[0].title}</h3>
      </div>
      <div>
        <AddInBrowser/>
        <AddInFunction/>
        <AddUsingGraphQL/>
      </div>
      <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </Wrapper>
  );
};

export default CtExperiment;
