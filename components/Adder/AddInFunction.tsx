import { ChangeEvent, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

type AdderProps = {
};

// Types
export type AddResultType = {
  counter: number;
  sum: string;
};

const AddInFunction: React.FC<AdderProps> = ({ /* item, handleAddToCart */ }) => {
  const [formData, setFormData] = useState({ summand1: 0, summand2: 0 });

  const getSum = async (): Promise<AddResultType> =>
    await (await fetch(`/api/add?arg1=${formData.summand1}&arg2=${formData.summand2}`,{ })).json();

  const functionResult = useQuery<AddResultType,Error>(
    ['adding', formData],
    getSum
  );

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `Function instance called ${functionResult?.data?.counter} times`;
  });

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
