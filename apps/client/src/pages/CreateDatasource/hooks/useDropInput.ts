import React, { useState } from 'react';
import { toast } from 'react-toastify';

const allowedExtensions = ['xlsx', 'png', 'jpg', 'svg'];

interface Props {
  setActiveFile: (file: File) => void;
}

const useDropInput = ({ setActiveFile }: Props) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const fileSize = file.size;
    const fileExtension = file.name.split('.').at(-1) ?? '';

    //10MB
    if (fileSize > 1000 * 1000 * 1) return toast.error('The file is over the maximum file size (1MB).');

    if (!allowedExtensions.includes(fileExtension)) return toast.error('The file has unsupported file extension.');

    setActiveFile(file);
  };

  return { dragActive, handleDrag, handleDrop, handleChange };
};

export default useDropInput;
