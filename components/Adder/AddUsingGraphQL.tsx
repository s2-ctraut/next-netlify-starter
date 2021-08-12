import { ChangeEvent, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

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

const EXCHANGE_RATES = gql`
  query hello {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const AddUsingGraphQL: React.FC<AdderProps> = ({ /* item, handleAddToCart */ }) => {
  const [formData, setFormData] = useState({ summand1: 0, summand2: 0 });

  const functionResult = useQuery<AddResultType,Error>(
    EXCHANGE_RATES
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData( {...formData, [event.target.name]: event.target.value});
    console.log('Adding using GraphQL');
    console.log(functionResult);
  }

  return(
    <div>
      <h3>Adding using GraphQL</h3>
      <input name="summand1" onChange={handleChange} />
      +
      <input name="summand2" onChange={handleChange} />
      =
      {functionResult?.data?.sum}
    </div>
  )
};

export default AddUsingGraphQL;
