import Button from '@ui/Button';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDeleteWordSource } from '../../../queries/wordSource';

const DeleteDatasourceForm = () => {
  const deletion = useDeleteWordSource();
  const { id: paramsID } = useParams();

  return (
    <div className="outline-error-200 rounded-default flex flex-col gap-4 p-6 outline-dashed outline-[2px]">
      <div className="flex flex-col gap-2">
        <h1 className="text-error-200 font-semibold leading-none">Delete datasource</h1>
        <p className="text-sm">This action cannot be undone.</p>
      </div>
      <Button
        onClick={() => deletion.mutate({ id: paramsID ?? '' })}
        className="text-error-200 max-w-[15rem] border border-gray-600 hover:shadow-none"
        intent="asWrapper"
        size="small"
      >
        Delete
      </Button>
    </div>
  );
};

export default DeleteDatasourceForm;
