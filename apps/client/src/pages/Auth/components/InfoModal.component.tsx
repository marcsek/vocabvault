import React from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';

interface Props {
  infoMessage?: string;
}

const InfoModal = ({ infoMessage }: Props) => {
  return (
    <div className="bg-primary-500 text-primary-100 rounded-default flex items-center gap-2 px-3 py-2">
      <AiFillInfoCircle size={24}></AiFillInfoCircle>
      <p className="text-error-50 text-sm">{infoMessage}</p>
    </div>
  );
};

export default InfoModal;
