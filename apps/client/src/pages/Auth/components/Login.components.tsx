import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trpc } from '../../../utils/trpc';
import handleSucessRedirect from '../handleSucessRedirect';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const login = trpc.auth.login.useMutation({
    onSuccess() {
      handleSucessRedirect({ navigate, queryClient });
    },
    onSettled(data) {
      console.log(data);
    },
  });

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
