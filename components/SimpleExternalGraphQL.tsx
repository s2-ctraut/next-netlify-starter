import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

type SimpleExternalGraphQLProps = {
};

const queryClient = new QueryClient();

const SimpleExternalGraphQL: React.FC<SimpleExternalGraphQLProps> = () => {
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
 // .then((result) => console.log(result)));

  type SimpleArgsType = { };

  const { data: episodeData} = useQuery<any,SimpleArgsType>(
    'episodes',
    getEpisodes
  );

  return(
    <QueryClientProvider client={queryClient}>
      <div>
        <h3>Simple External Graphql Result: episode is {episodeData?.data?.allEpisode[0].title}</h3>
      </div>
    </QueryClientProvider>
  )
};

export default SimpleExternalGraphQL;
