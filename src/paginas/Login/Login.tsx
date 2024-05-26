import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Importe o arquivo CSS

interface LoginFormProps {
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });
      const token = response.data.token;
      setToken(token);
      localStorage.setItem('token', token);  // Armazene o token no localStorage
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <body className='bodyLogin'>
      <section>
        <form onSubmit={handleSubmit}>
          <h1 className='h1Login'>Login</h1>
          <div className='inputbox'>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <label htmlFor=''>Email:</label>
          </div>
          <div className='inputbox'>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <label> Password:</label>
          </div>
          
          
          <button type="submit">Login</button>
        </form>
      </section>
    </body>
  );
};

export default LoginForm;
