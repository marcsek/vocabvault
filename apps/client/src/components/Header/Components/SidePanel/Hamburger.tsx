import React from 'react';

interface Props {
  handleClick?: () => void;
}

const Hamburger = ({ handleClick }: Props) => {
  return (
    <div onClick={handleClick} className="flex flex-col justify-between gap-1 p-3">
      <div className="h-0.5 w-6 rounded bg-gray-100"></div>
      <div className="h-0.5 w-6 rounded bg-gray-100"></div>
      <div className="h-0.5 w-6 rounded bg-gray-100"></div>
    </div>
  );
};

export default Hamburger;
