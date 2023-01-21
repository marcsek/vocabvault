import React from 'react';
import { useUser } from '../../../../providers/UserContext.provider';
import Children from './Children/Children';
import Parent from './Parent/Parent';

const Social = () => {
  const user = useUser();

  return <>{user?.type === 'ADULT' ? <Children /> : <Parent />}</>;
};

export default Social;
