import IdSocialCopy from '../IdSocialCopy';
import ParentProfile from './ParentProfile';

const Parent = () => {
  return (
    <div className="flex max-w-xl flex-shrink flex-grow flex-col gap-12">
      <div className="flex flex-col gap-2 leading-none">
        <h2 className="text-xl font-bold text-gray-50">Parent</h2>
        <p className="text-sm text-gray-400">See your current parrent.</p>
      </div>
      <div className="flex flex-col gap-8">
        <IdSocialCopy />
        <ParentProfile />
      </div>
    </div>
  );
};

export default Parent;
