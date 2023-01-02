import React, { useState } from 'react';
import { trpc } from '../../../utils/trpc';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const login = trpc.auth.register.useMutation({
    onSettled(data) {
      console.log(data);
    },
  });

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login.mutate({ email, password, name });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <p>Name</p>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <p>Email</p>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <p>Password</p>
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Register;
