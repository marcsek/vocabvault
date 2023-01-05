import React, { useRef } from 'react';
import useDropInput from '../../hooks/useDropInput';
import FilePreview from './FilePreview.component';
import UploadFileModal from './UploadFileModal.component';

const DragAndDrop = () => {
  const { dragActive, activeFile, handleDrag, handleDrop, handleChange } = useDropInput();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div onDragEnter={handleDrag} className="rounded-default relative box-border h-full outline-dashed outline-1 outline-gray-600">
      <input ref={inputRef} type="file" id="input-file-upload" name="file" onChange={handleChange} className="hidden"></input>
      <label htmlFor="input-file-upload" className="h-full">
        <div className={`flex h-full items-center justify-center ${dragActive ? 'bg-gray-700/50' : ''}`}>
          {activeFile ? <FilePreview file={activeFile} /> : <UploadFileModal handleClickRef={inputRef} />}
        </div>
      </label>
      {dragActive && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className="absolute inset-0 h-full w-full"
        ></div>
      )}
    </div>
  );
};

export default DragAndDrop;
