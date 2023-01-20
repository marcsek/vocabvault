import Button from '@ui/Button';
import TextField from '@ui/TextField';
import { BiHash } from 'react-icons/bi';
const AddUserBySocialID = () => {
  return (
    <div className="justify-cente flex items-end gap-4">
      <TextField labelText="Add new child with Social ID" IconLeft={<BiHash className="text-gray-400" />} />
      <Button className="min-w-fit" size="small">
        Add child
      </Button>
    </div>
  );
};

export default AddUserBySocialID;
