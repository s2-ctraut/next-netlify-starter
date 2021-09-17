// See https://github.com/deepakaggarwal7/react-social-login

import PropTypes from 'prop-types';
import React, { Component } from 'react';

import SocialLogin from 'react-social-login';

/*
const SocialButton : SocialLogin  = ({ children, triggerLogin, triggerLogout, ...props } = props)=>{
    
    const style = {
      background: '#eee',
      border: '1px solid black',
      borderRadius: '3px',
      backgroundColor:'orange',
      display: 'inline-block',
      margin: '5px',
      padding: '10px 20px'
    }

    return (
      <div onClick={triggerLogin} style={style} {...props}>
        { children }
      </div>
    )
  
}

export default SocialButton;
*/


class SocialButton extends React.Component {
    render() {
      const { children, triggerLogin, ...props } = this.props;
      return (
        <button onClick={triggerLogin} {...props}>
          {children}
        </button>
      );
    }
  }
  
export default SocialLogin(SocialButton);
