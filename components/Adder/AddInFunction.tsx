import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';

type AdderProps = {
};

// Types
export type AddResultType = {
  counter: number;
  sum: string;
};

/*
export type AddArgsType = {
    arg1: number;
    arg2: number;
};


export type AddArgsType = {
  queryKey: [
    arg1: number,
    arg2: number
  ]
};
*/

const AddInFunction: React.FC<AdderProps> = ({ /* item, handleAddToCart */ }) => {
  const [formData, setFormData] = useState({ summand1: 0, summand2: 0 });

  const getSum = async (): Promise<AddResultType> =>
    await (await fetch(`/.netlify/functions/add?arg1=${formData.summand1}&arg2=${formData.summand2}`,{ })).json();

  const functionResult = useQuery<AddResultType,Error>(
    ['adding', formData],
    getSum
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData( {...formData, [event.target.name]: event.target.value});
    console.log('Adding in function');
  }

  return(
    <div>
      <h3>Adding in function</h3>
      <input name="summand1" onChange={handleChange} />
      +
      <input name="summand2" onChange={handleChange} />
      =
      {functionResult?.data?.sum}
    </div>
  )
};

export default AddInFunction;
