import React from 'react';
import { HiOutlineDatabase } from 'react-icons/hi';

interface Props {
  file: File;
}

const FilePreview = ({ file }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-success-300 rounded-default w-fit p-2">
        <HiOutlineDatabase size={50} />
      </div>
      <div className="box-border flex flex-col items-center gap-2">
        <p className="text-sm leading-none text-gray-200">{file.name}</p>
        <span className="text-xs leading-none text-gray-400">{new Date(file.lastModified).toDateString()}</span>
      </div>
    </div>
  );
};

export default FilePreview;
