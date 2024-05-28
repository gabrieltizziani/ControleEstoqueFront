import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file

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
      localStorage.setItem('token', token); // Store the token in localStorage
      alert('Login realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao realizar Login:', error);
      alert('Erro ao realizar Login. Verifique se todos os espaços estão preenchidos e estão corretos.');
    }
  };

  return (
    <div className='bodyLogin'>
      <section>
        <form onSubmit={handleSubmit}>
          <h1 className='h1Login'>Login</h1>
          <div className='inputbox'>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor=''>Email:</label>
          </div>
          <div className='inputbox'>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label>Password:</label>
          </div>
          <button type="submit">Login</button>
        </form>
      </section>
    </div>
  );
};

export default LoginForm;
