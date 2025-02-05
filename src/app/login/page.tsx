'use client'; // Required for client-side rendering

import { useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { username,  password} = formData;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signIn({username, password});
      console.log('login info', username,password);
      //router.push('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="Username or Email"
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
