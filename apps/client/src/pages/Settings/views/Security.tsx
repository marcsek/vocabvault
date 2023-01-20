import Button from '@ui/Button';
import TextField from '@ui/TextField';

const Security = () => {
  return (
    <div className="flex w-full flex-col gap-12">
      <div className="flex flex-col gap-2 leading-none">
        <h2 className="text-xl font-bold text-gray-50">Security</h2>
        <p className="text-sm text-gray-400">Manage your passwords.</p>
      </div>
      <div className="flex flex-col gap-8 lg:max-w-[32rem]">
        <TextField labelText="New password" />
        <TextField labelText="Retype password" />
      </div>
      <Button className="w-fit">Save password</Button>
    </div>
  );
};

export default Security;
