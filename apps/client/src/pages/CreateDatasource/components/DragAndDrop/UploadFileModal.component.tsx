import React from 'react';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';

interface Props {
  handleClickRef: React.RefObject<HTMLInputElement>;
}

const UploadFileModal = ({ handleClickRef }: Props) => {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <MdOutlineDriveFolderUpload className="text-gray-500" size={50} />
      <div>
        <div className="flex gap-1 text-sm leading-none">
          <button type="button" onClick={() => handleClickRef.current?.click()} className="text-primary-200 hover:underline">
            Upload a database
          </button>
          <p className="text-gray-400"> or drag and drop</p>
        </div>
        <span className="mt-2 block w-full text-center text-xs font-medium leading-none text-gray-400">.xlsx, .xlsxm, .xls up to 1MB</span>
      </div>
    </section>
  );
};

export default UploadFileModal;
