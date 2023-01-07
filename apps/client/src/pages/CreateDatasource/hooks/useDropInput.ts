import React, { useState } from 'react';

const allowedExtensions = ['xlsx', 'png', 'jpg', 'svg'];

const useDropInput = () => {
  const [dragActive, setDragActive] = useState(false);
  const [activeFile, setActivefile] = useState<File | null>();

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
    if (fileSize > 1000 * 1000 * 1) return console.log('too big');

    if (!allowedExtensions.includes(fileExtension)) return console.log('wrong file extension');

    setActivefile(file);
  };

  return { dragActive, activeFile, handleDrag, handleDrop, handleChange };
};

export default useDropInput;
