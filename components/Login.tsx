import React from 'react';
import { GoogleLoginButton } from 'ts-react-google-login-component';
// Not https://github.com/anthonyjgrove/react-google-login
import { GoogleProfile } from './GoogleProfile';

type LoginState = {
    email: string
}

// export const Login: React.Component<LoginProps> = ({ setGoogleUser }) => {
export class Login extends React.Component<{}, LoginState> {

    constructor(props) {
        super(props);
        this.state = { email: 'unknown email' };
       }

    preLoginTracking(): void {
        console.log('Attempt to login with google');
        // this.setState({ email: 'unknownEmail' });
    }

    errorHandler(error: string): void{
        // handle error if login got failed...
        console.error(error);
    }

    responseGoogle(googleUser: gapi.auth2.GoogleUser): void {
        const id_token = googleUser.getAuthResponse(true).id_token;
        const googleId = googleUser.getId();

        console.log({ googleId });
        console.log({accessToken: id_token});
        const userProfile = googleUser.getBasicProfile();
        console.log(userProfile.getEmail());
        this.setState({ email: googleUser.getBasicProfile().getEmail() });
        // Make user login in your system
        // login success tracking...
    }

    render(): JSX.Element {
        // TODO
        const clientConfig = { client_id: '261377444261-5ovk2irequohduu8eddis19l5ofvfl53.apps.googleusercontent.com' };
        // const clientConfig = { client_id: 'youappid' }

        return (
        <div>
                <GoogleLoginButton
                    responseHandler={this.responseGoogle}
                    clientConfig={clientConfig}
                    preLogin={this.preLoginTracking}
                    failureHandler={this.errorHandler}
                />
                gUser: {this.state?.email}
                <GoogleProfile email={this.state?.email} />
        </div>
        )
    }

}