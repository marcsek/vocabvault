import Divider from '@ui/Divider';
import { TGetAllUserSourcesOutput } from 'server/src/schemas/wordSource.schema';
import SourceStats from './SourceStats.component';
import SourceHeading from './SourceHeading.component';
import SourceStatus from './SourceStatus.component';
import { useNavigate } from 'react-router-dom';

interface Props {
  cardData: TGetAllUserSourcesOutput;
}

const SourceCard = ({
  cardData: { createdAt, creator, documentType, firstLanguage, secondLanguage, name, wordPairs, userAvailableSources, type, id },
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="relative cursor-pointer" onClick={() => navigate(`./${id}`)}>
      <div className="rounded-default relative z-10 flex h-[21rem] w-full flex-col gap-6 border border-gray-600 bg-gray-800 p-6 shadow-lg">
        <SourceHeading
          creator={creator}
          secondLangCode={secondLanguage.code}
          firstLangCode={firstLanguage.code}
          name={name}
        ></SourceHeading>
        <Divider className=" w-full rounded-full outline-dashed outline-1 outline-gray-600" />
        <div className="flex h-full flex-col justify-between leading-none">
          <SourceStats creationDate={createdAt} docType={documentType} wordPairs={wordPairs.length} />
          <SourceStatus creator={creator} watchers={userAvailableSources} type={type} />
        </div>
      </div>
      <div
        className={`rounded-default absolute left-4 -right-1 top-2 -bottom-1 rotate-3 ${
          type === 'watched' ? 'bg-primary-300/80' : type === 'shared' ? 'bg-secondary-300/80' : 'bg-gray-700'
        } drop-shadow-lg`}
      ></div>
    </div>
  );
};

export default SourceCard;
