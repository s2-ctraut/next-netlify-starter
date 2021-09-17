import React, { useState } from 'react';
import { RemoteProfile, RemoteProfileProps } from './RemoteProfile';
import SocialButton from './SocialButton';

// const REDIRECT_URI = 'https://reactjs-social-login.netlify.app/account/login';
// const REDIRECT_URI = 'http://localhost:8888/social';

const clientConfig = { google: { app_id: '261377444261-5ovk2irequohduu8eddis19l5ofvfl53.apps.googleusercontent.com' }};

const LoggedIn: React.FC = () => {
  const [rProfile, setRemoteProfile] = useState<RemoteProfileProps>();
  const handleGoogleSocialLogin = (user: any) => {
    console.log(user);
    console.log('Profile:');
    console.log(user.profile);
    setRemoteProfile(user.profile);
  };
  
  const handleSocialLoginFailure = (err: any) => {
    console.error(err);
  };
  return(
    <div>
      {
        rProfile? 
        <RemoteProfile {...rProfile}/>
        : <SocialButton
            provider="google"
            appId={clientConfig.google.app_id}
            onLoginSuccess={handleGoogleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
          >
            Login with google
          </SocialButton>
      }
    </div>
    );
  };

  export default LoggedIn;