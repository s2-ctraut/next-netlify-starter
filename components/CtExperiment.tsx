import { ReactQueryDevtools } from "react-query/devtools";
import React from 'react';
import AddInBrowser from './Adder/AddInBrowser';
import AddInFunction from './Adder/AddInFunction';
import AddUsingGraphQL from './Adder/AddUsingGraphQL';
import SimpleExternalGraphQL from "./SimpleExternalGraphQL";
import { Wrapper } from '../styles/App.styles';
import { UserProfile } from "./UserProfile";

const CtExperiment = () => {
  return (
    <Wrapper>
      <div>
        <AddInBrowser/>
        <AddInFunction/>
        <AddUsingGraphQL/>
        <SimpleExternalGraphQL/>
        <UserProfile/>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </Wrapper>
  );
};

export default CtExperiment;
