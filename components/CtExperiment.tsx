import { useQuery } from 'react-query';
// Components
import LinearProgress from '@material-ui/core/LinearProgress';
// Styles
import { Wrapper } from '../styles/App.styles';

// Types
export type AddingType = {
  counter: number;
  sum: string;
};

const getSum = async (): Promise<AddingType> =>
  await (await fetch('/.netlify/functions/add?arg1=342&arg2=102')).json();

const CtExperiment = () => {
  // const { mathData, isMathLoading, mathError } = useQuery<AdditingType>(
  const addQueryResult = useQuery<AddingType>(
    'addition',
    getSum
  );
  console.log(addQueryResult.data);

  if (addQueryResult.isLoading) return <LinearProgress />;
  if (addQueryResult.error) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <div>
      <h3>Sum: {addQueryResult.data?.sum}</h3>
      <h3>Counter: {addQueryResult.data?.counter}</h3>
    </div>
    </Wrapper>
  );
};

export default CtExperiment;
