import IdSocialCopy from '../IdSocialCopy';
import ManageChildren from './ManageChildren';

const Children = () => {
  return (
    <div className="flex max-w-xl flex-shrink flex-grow flex-col gap-12">
      <div className="flex flex-col gap-2 leading-none">
        <h2 className="text-xl font-bold text-gray-50">Children</h2>
        <p className="text-sm text-gray-400">Manage children accounts.</p>
      </div>
      <div className="flex flex-col gap-8">
        <IdSocialCopy />
        <ManageChildren />
      </div>
    </div>
  );
};

export default Children;
