// See https://github.com/deepakaggarwal7/react-social-login

import React from 'react';

import SocialLogin, { Props } from 'react-social-login';

class SocialButton extends React.Component<Props> {
    style = {
      background: '#eee',
      border: '1px solid black',
      borderRadius: '3px',
      backgroundColor:'orange',
      display: 'inline-block',
      margin: '5px',
      padding: '10px 20px'
    }

    render() {
      const { children, triggerLogin, ...props } = this.props;
      return (
        <div style={this.style}>
          <button onClick={triggerLogin} {...props}>
            {children}
          </button>
        </div>
      );
    }
  }
  
export default SocialLogin(SocialButton);
