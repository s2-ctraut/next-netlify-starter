// TODO: https://thecodest.co/blog/deploy-graphql-mongodb-api-using-netlify-functions/

import { ChangeEvent, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

type AdderProps = {
};

interface AddResultType {
  counter: number;
  sum: string;
};

interface AddArgs {
    summand1: number;
    summand2: number;
};

const SUM_OF = gql`
  query Adder($summand1: Int!, $summand2: Int!) { 
    sum (summand1: $summand1, summand2: $summand2)
  }
`
;

const AddUsingGraphQL: React.FC<AdderProps> = ({ /* item, handleAddToCart */ }) => {
  const [formData, setFormData] = useState({ summand1: 0, summand2: 0 });

  const functionResult = useQuery<AddResultType,AddArgs>(
    SUM_OF, {variables: { summand1: Number(formData.summand1) || 0, summand2: Number(formData.summand2) || 0 }}
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData( {...formData, [event.target.name]: event.target.value});
    console.log('Adding using GraphQL');
    // console.log(functionResult);
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
