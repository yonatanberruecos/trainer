'use client'; // Required for client-side rendering

import { useContext, useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { MainContext } from '../context/MainContextAppProvider';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const { setWorkoutData } = useContext<any>(MainContext);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, username,  password} = formData;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signIn({username, password});
      console.log('login info', username, password, email);
      setWorkoutData((prev: any) => {
        return {
          ...prev,
          user: {
            name: '',
            email: email
          }
        } 
      });
      router.push('/fit'); // Redirect to dashboard on success
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Log In</button>
    </form>
  );
}
