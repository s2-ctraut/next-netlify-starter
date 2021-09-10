import React from 'react';
import { Login } from './login';


export const GoogleUserProfile: React.FC = () => {
    // const [formData, setFormData] = useState({ email: 'john2@example.com', password: '' });

    return(
            <div>
              <h3>Login using Google</h3>
              <Login/>
              <GoogleProfile/>
            </div>
      );
    };