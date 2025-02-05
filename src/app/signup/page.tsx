'use client'
import { useEffect, useState } from 'react';
import { signUp } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import { COGNITO_CONFIG } from '../../../aws-exports';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', username: '', email: '', phone:'', password: '' });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let res = null;
    try {
        res = await signUp({
        username: formData.username,
        password: formData.password,
        options: {
            userAttributes: {
                name: formData.name,
                email: formData.email,
                phone_number: formData.phone
            },
        }
      });

      // console.log('res', res);
    } catch (error) {
      console.error('Sign-up error:', error);
      throw Error('error adding to cognito');
    }

    if(res.userId){
      try {
        const { name, username, email, password} = formData

         const payloadUser = {
           name,
           username,
           email,
           password
         }

         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(payloadUser),
         });
         const responseSaved = await response.json();

         console.log('usuario creado', responseSaved);
       } catch (error) {
         console.log('error saving the user', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" type="text" placeholder="Phone" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
}
