import { useQuery } from 'react-query';

// Components
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

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
  const { data, isLoading, error } = useQuery<AddingType>(
    'addition',
    getSum
  );
  console.log(data);

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  const handleCoolStuff = () => {
    console.log('Handling cool stuff...');
  }

  return (
    <Wrapper>
      <div>
        <Button onClick={() => handleCoolStuff()}>Do cool stuff</Button>

        <h3>Sum: {data?.sum}</h3>
        <h3>Counter: {data?.counter}</h3>
      </div>
    </Wrapper>
  );
};

export default CtExperiment;
