import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/auth');
  }, []);

  return <div className="max-h-96"></div>;
};

export default Landing;
