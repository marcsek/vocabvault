import Button from '@ui/Button';
import TextField from '@ui/TextField';
import { useState } from 'react';
import { BiHash } from 'react-icons/bi';
import { useAddChild } from '../../../../../queries/user';

const AddUserBySocialID = () => {
  const [socialId, setSocialId] = useState<string>('');
  const addChild = useAddChild();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || /^\d+$/.test(e.target.value)) setSocialId(e.target.value);
  };

  return (
    <div className="justify-cente flex items-end gap-4">
      <TextField
        value={socialId}
        onChange={handleInputChange}
        labelText="Add new child with Social ID"
        IconLeft={<BiHash className="text-gray-400" />}
      />
      <Button
        loading={addChild.isPending}
        onClick={() => addChild.mutate({ socialId: parseInt(socialId) })}
        className="h-10 min-w-fit"
        size="small"
      >
        Add child
      </Button>
    </div>
  );
};

export default AddUserBySocialID;
