import { ReactQueryDevtools } from "react-query/devtools";
import React from 'react';
import AddInBrowser from './Adder/AddInBrowser';
import AddInFunction from './Adder/AddInFunction';
import AddUsingGraphQL from './Adder/AddUsingGraphQL';
import SimpleExternalGraphQL from "./SimpleExternalGraphQL";
import { Wrapper } from '../styles/App.styles';

const CtExperiment = () => {
  return (
    <Wrapper>
      <div>
        <AddInBrowser/>
        <AddInFunction/>
        <AddUsingGraphQL/>
        <SimpleExternalGraphQL/>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </Wrapper>
  );
};

export default CtExperiment;
