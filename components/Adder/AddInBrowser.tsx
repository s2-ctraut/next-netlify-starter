import { ChangeEvent, useState } from 'react';

type AdderProps = {
};

const sum = (s1: number, s2: number): number => ( s1 + s2);

const AddInBrowser: React.FC<AdderProps> = ({ /* item, handleAddToCart */ }) => {
  const [result, setResult] = useState({ sum: 0 });
  const [formData, setFormData] = useState({ summand1: 0, summand2: 0 });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFormData = {...formData, [event.target.name]: event.target.value};
    setFormData(newFormData);
    setResult({sum: sum(Number(newFormData.summand1), Number(newFormData.summand2)) });
    console.log('Added in browser');
  }

  return(
    <div>
      <h3>Adding in browser</h3>
      <input name="summand1" onChange={handleChange} />
      +
      <input name="summand2" onChange={handleChange} />
      =
      {result?.sum}
    </div>
  )
};

export default AddInBrowser;
